import { File } from '@prisma/client'
import fs from 'fs'
import path from 'path'

export const getFile = async (fileId: File['id']): Promise<Buffer | null> => await new Promise<Buffer | null>((resolve, reject) => {
  fs.readFile(path.resolve(process.cwd(), `./data/${fileId}`), (err, data) => {
    if (err != null) reject(err)
    else resolve(data)
  })
})
