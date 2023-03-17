import { User as PrismaUser } from '@prisma/client'

export interface UserLinks {
  title: string
  href: string
  text?: string
}

export interface User extends PrismaUser {
  links: UserLinks[]
}
