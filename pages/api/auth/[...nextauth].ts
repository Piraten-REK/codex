import NextAuth from 'next-auth'
import type { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import type { SessionUser } from '../../../next-auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Username and password',
      credentials: {
        user: { type: 'text', label: 'Username or email', placeholder: 'Username or email' },
        password: { type: 'password', label: 'Password', placeholder: 'Password' }
      },
      async authorize (credentials): Promise<User | null> {
        if (credentials == null) return null

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { username: credentials.user },
              { email: credentials.user }
            ]
          },
          select: {
            id: true,
            username: true,
            email: true,
            password: true,
            isActive: true
          }
        })
          .catch(error => console.error(error))
          .finally(() => { void prisma.$disconnect() })

        if (user == null || !user.isActive) return null

        const passwordMatch = await bcrypt.compare(credentials.password, user.password)

        if (!passwordMatch) return null

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          image: undefined
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session ({ session, token }) {
      if (token.sub != null) {
        const user = await prisma.user.findUnique({
          where: {
            id: token.sub
          },
          select: {
            id: true,
            username: true,
            displayName: true,
            email: true,
            bio: true,
            links: true,
            isActive: true,
            isAdmin: true
          }
        })
          .catch(error => console.error(error))
          .finally(() => { void prisma.$disconnect() })

        if (user != null) {
          session.user = user as SessionUser
        }
      }

      return session
    }
  }
}

export default NextAuth(authOptions)
