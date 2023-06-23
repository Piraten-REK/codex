import { PrismaClient } from '@prisma/client'
import { NextApiHandler } from 'next'

const handler: NextApiHandler = async (req, res) => {
  const { username } = req.query
  const download = Object.hasOwn(req.query, 'download') && req.query.download !== 'no' && req.query.download !== 'false'

  const prisma = new PrismaClient()
  const user = await prisma.user.findUnique({
    where: {
      username: username as string
    },
    select: {
      avatar: {
        select: {
          id: true,
          filename: true,
          mimetype: true,
          data: true
        }
      }
    }
  })

  if (user === null) {
    res
      .status(404)
      .json({ status: 'error', reason: 'User not found' })
    return
  }

  if (user.avatar === null) {
    res
      .status(404)
      .json({ status: 'error', reason: 'User has no avatar set' })
    return
  }

  if (user.avatar.data == null) {
    res
      .status(500)
      .json({ status: 'error', reason: 'Internal server error' })
    return
  }

  if (download && user.avatar.filename !== '') {
    res.setHeader('Content-Disposition', `attachment; filename="${user.avatar.filename}"`)
  }

  res
    .setHeader('Content-Type', user.avatar.mimetype)
    .setHeader('Conent-Length', user.avatar.data.length)
    .end(user.avatar.data)
}

export default handler
