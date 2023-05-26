import type { GetServerSideProps, NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Layout from '@/components/Layout'
import Users, { UsersProps } from '@/components/pages/preferences/Users'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]'
import { PrismaClient, Prisma } from '@prisma/client'
import { User } from '@/db'

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
    prisma.user.findMany({
      where: {
        isActive: true
      },
      ...initialUsersSettings
    }) as unknown as User[],
    prisma.user.findMany({
      where: {
        isActive: false
      },
      ...initialUsersSettings
    }) as unknown as User[],
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
