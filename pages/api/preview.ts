import { NextApiRequest, NextApiResponse } from 'next'
import Prismic from 'prismic-javascript'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.query.token

  if (!token || typeof token !== 'string') {
    res.status(400).send('Missing token from preview request')
    return
  }

  try {
    const client = Prismic.client('https://yuzu.cdn.prismic.io/api/v2', { req })
    const url = await client.previewSession(token, () => '/', '/')
    res.writeHead(302, { Location: url })
    res.end()
  } catch {
    res.status(400).send('Something went wrong with the previewSession request')
  }
}
