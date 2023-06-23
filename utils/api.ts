import { NextApiResponse } from 'next'

export const respond = (res: NextApiResponse, status: number, data: unknown, meta?: { [key: string]: unknown }): void => {
  const json = {
    success: status < 400,
    [status < 400 ? 'data' : 'error']: data
  }

  if (meta != null) json.meta = meta

  res
    .status(status)
    .json(json)
}
