import { NextApiHandler } from 'next'
import { z } from 'zod'
import { PrismaClient, Prisma } from '@prisma/client'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../auth/[...nextauth]'
import { respond } from '@/utils/api'

export const schema = z.object({
  count: z.string().default('10').transform(Number).pipe(
    z.number().int().positive().max(100)
  ),
  offset: z.string().default('0').transform(Number).pipe(
    z.number().int().nonnegative().default(0)
  )
})

export const adminSchema = schema.extend({
  includeInactive: z.enum(['yes', 'no', '0', '1', 'true', 'false']).optional()
    .transform(val => ['yes', '1', 'true'].some(it => it === val))
})

export type Schema = z.input<typeof schema>

export type AdminSchema = z.input<typeof adminSchema>

const handler: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  const prisma = new PrismaClient()

  const select = {
    username: true,
    displayName: true,
    gender: true,
    email: true,
    bio: true,
    links: true,
    avatar: { select: { id: true } }
  } as const satisfies Prisma.UserSelect

  const orderBy = [
    {
      username: 'asc'
    },
    {
      email: 'asc'
    }
  ] as Prisma.Enumerable<Prisma.UserOrderByWithRelationInput>

  if (session == null || session.user == null) { // unauthorized
    const parsed = schema.safeParse(req.query)

    if (!parsed.success) {
      return respond(
        res,
        400,
        parsed.error.flatten().fieldErrors
      )
    }

    const { count, offset } = parsed.data

    Promise.all([
      prisma.user.findMany({
        orderBy,
        take: count,
        skip: offset * count,
        select,
        where: { isActive: true }
      }),
      prisma.user.aggregate({
        where: { isActive: true },
        _count: true
      })
    ])
      .then(([users, total]) => respond(
        res,
        200,
        users.map(user => ({
          ...user,
          avatar: user.avatar && `/api/users/${user.username}/avatar` // eslint-disable-line @typescript-eslint/strict-boolean-expressions
        })),
        {
          count,
          offset,
          total: total._count
        }
      ))
      .catch(err => {
        console.error(err)
        respond(
          res,
          500,
          'Error fetching data from database'
        )
      })
      .finally(() => {
        void prisma.$disconnect()
      })
  } else if (!session.user.isAdmin) { // no admin user
    const parsed = schema.safeParse(req.query)

    if (!parsed.success) {
      return respond(
        res,
        400,
        parsed.error.flatten().fieldErrors
      )
    }

    const { count, offset } = parsed.data

    Promise.all([
      prisma.user.findMany({
        orderBy,
        take: count,
        skip: offset * count,
        select: {
          ...select,
          id: true
        },
        where: { isActive: true }
      }),
      prisma.user.aggregate({
        where: { isActive: true },
        _count: true
      })
    ])
      .then(([users, total]) => respond(
        res,
        200,
        users.map(user => ({
          ...user,
          avatar: user.avatar && `/api/users/${user.username}/avatar` // eslint-disable-line @typescript-eslint/strict-boolean-expressions
        })),
        {
          count,
          offset,
          total: total._count
        }
      ))
      .catch(err => {
        console.error(err)
        respond(
          res,
          500,
          'Error fetching data from database'
        )
      })
      .finally(() => {
        void prisma.$disconnect()
      })
  } else { // admin user
    const parsed = adminSchema.safeParse(req.query)

    if (!parsed.success) {
      return respond(
        res,
        400,
        parsed.error.flatten().fieldErrors
      )
    }

    const { count, offset, includeInactive } = parsed.data

    Promise.all([
      prisma.user.findMany({
        orderBy,
        take: count,
        skip: offset * count,
        select: {
          ...select,
          id: true,
          isAdmin: true,
          isActive: true
        },
        where: !includeInactive ? { isActive: true } : undefined
      }),
      prisma.user.aggregate({
        where: !includeInactive ? { isActive: true } : undefined,
        _count: true
      })
    ])
      .then(([users, total]) => respond(
        res,
        200,
        users.map(user => ({
          ...user,
          avatar: user.avatar && `/api/users/${user.username}/avatar` // eslint-disable-line @typescript-eslint/strict-boolean-expressions
        })),
        {
          count,
          offset,
          total: total._count,
          includeInactive
        }
      ))
      .catch(err => {
        console.error(err)
        respond(
          res,
          500,
          'Error fetching data from database'
        )
      })
      .finally(() => {
        void prisma.$disconnect()
      })
  }
}

export default handler
