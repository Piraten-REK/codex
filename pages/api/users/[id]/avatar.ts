import { PrismaClient } from '@prisma/client'
import { NextApiHandler } from 'next'
import { getFile } from '@/utils/api'

const handler: NextApiHandler = async (req, res) => {
  const { id: userId } = req.query
  const download = Object.hasOwn(req.query, 'download') && req.query.download !== 'no' && req.query.download !== 'false'

  const prisma = new PrismaClient()
  const user = await prisma.user.findUnique({
    where: {
      id: userId as string
    },
    select: {
      avatar: {
        select: {
          id: true,
          filename: true,
          mimetype: true
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
      .json({ status: 'error', reason: 'User ha no avatar set' })
    return
  }

  const data = await getFile(user.avatar.id)

  if (data === null) {
    res
      .status(404)
      .json({ status: 'error', reason: 'User ha no avatar set' })
    return
  }

  if (download && user.avatar.filename !== '') {
    res.setHeader('Content-Disposition', `attachment; filename="${user.avatar.filename}"`)
  }

  res
    .setHeader('Content-Type', user.avatar.mimetype)
    .setHeader('Conent-Length', data.length)
    .end(data)
}

export default handler
