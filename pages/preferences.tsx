import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Layout from '@/components/Layout'
import Users, { UsersProps } from '@/components/pages/preferences/Users'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]'
import { PrismaClient, Prisma } from '@prisma/client'
import { SerializableUserWithAvatar, UserWithAvatar } from '@/db'

export interface PreferencesProps {
  usersProps: UsersProps
}

const Preferences: NextPage<PreferencesProps> = ({ usersProps }) => {
  const { data: session } = useSession()

  console.log(session)

  return (
    <Layout
      title='Einstellungen'
      tabs={[
        {
          key: 'general',
          title: 'Allgemein',
          content: <p>Allgemein</p>
        },
        {
          key: 'users',
          title: 'Benutzer',
          content: <Users {...usersProps} />
        }
      ]}
    />
  )
}

export default Preferences

const initialUsersSettings: Prisma.UserFindManyArgs = {
  select: {
    id: true,
    username: true,
    displayName: true,
    gender: true,
    email: true,
    bio: true,
    links: true,
    isActive: true,
    isAdmin: true,
    avatar: {
      select: {
        id: true,
        filename: true,
        mimetype: true,
        uploaded: true,
        uploader: true
      }
    }
  },
  orderBy: {
    displayName: 'asc'
  },
  take: 10
}

export const getServerSideProps: GetServerSideProps<PreferencesProps> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (session == null) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const prisma = new PrismaClient()
  const [initialActiveUsers, initialInactiveUsers, activeUsersCount, inactiveUsersCount] = await Promise.all([
    (prisma.user.findMany({
      where: {
        isActive: true
      },
      ...initialUsersSettings
    }) as unknown as Promise<UserWithAvatar[]>)
      .then(users => users.map(user => {
        if (user.avatar != null) {
          // @ts-expect-error
          user.avatar.uploaded = user.avatar.uploaded.toISOString()
        }
        return user as SerializableUserWithAvatar
      })),
    (prisma.user.findMany({
      where: {
        isActive: false
      },
      ...initialUsersSettings
    }) as unknown as Promise<UserWithAvatar[]>)
      .then(users => users.map(user => {
        if (user.avatar != null) {
          // @ts-expect-error
          user.avatar.uploaded = user.avatar.uploaded.toISOString()
        }
        return user as SerializableUserWithAvatar
      })),
    prisma.user.count({
      where: {
        isActive: true
      }
    }),
    prisma.user.count({
      where: {
        isActive: false
      }
    })
  ])
    .finally(() => { void prisma.$disconnect() })

  return {
    props: {
      usersProps: {
        initialActiveUsers,
        initialInactiveUsers,
        activeUsersCount,
        inactiveUsersCount
      }
    }
  }
}
