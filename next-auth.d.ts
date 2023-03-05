import NextAuth from 'next-auth/next' // eslint-disable-line @typescript-eslint/no-unused-vars
import type { User } from '@prisma/client'

interface SessionUser extends Omit<User, 'password'> {
  links: Array<{ name: string, url: string }>
}

declare module 'next-auth' {
  /**
   * Returned by 'useSession', 'getSession' and received as a prop on the 'SessionProvider' React Context
   */
  interface Session {
    user: SessionUser
  }
}
