import NextAuth from 'next-auth/next' // eslint-disable-line @typescript-eslint/no-unused-vars
import type { UserWithAvatar } from './db'

declare module 'next-auth' {
  /**
   * Returned by 'useSession', 'getSession' and received as a prop on the 'SessionProvider' React Context
   */
  interface Session {
    user: UserWithAvatar
  }
}
