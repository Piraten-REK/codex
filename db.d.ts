import type { File, Prisma, User as PrismaUser } from '@prisma/client'
import { Replace } from './utils'

export type User = Replace<PrismaUser, 'links', UserLink[]>

export type UserWithAvatar = Replace<Prisma.UserGetPayload<{
  select: {
    id: true
    username: true
    displayName: true
    gender: true
    email: true
    bio: true
    links: true
    isActive: true
    isAdmin: true
    avatar: true
  }
}>, 'links', UserLink[]>

export type SerializableUserWithAvatar = Replace<UserWithAvatar, 'avatar', Replace<File, 'uploaded', string> | null>

export interface UserLink {
  title: string
  href: string
  text?: string
}
