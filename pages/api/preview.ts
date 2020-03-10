import { NextApiRequest, NextApiResponse } from 'next'
import Prismic from 'prismic-javascript'

import { prismicUrl } from '../../constants'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.query.token

  if (!token || typeof token !== 'string') {
    res.status(400).send('Missing token from preview request')
    return
  }

  try {
    const client = Prismic.client(prismicUrl, { req })
    const url = await client.previewSession(token, () => '/', '/')
    res
      .setPreviewData({ token })
      .writeHead(307, { Location: url })
      .end()
  } catch {
    res.status(400).send('Something went wrong with the previewSession request')
  }
}
