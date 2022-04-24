import { createClient } from 'contentful'

import { Entry } from 'contentful'
import { Document } from '@contentful/rich-text-types'

export const buildClient = () => {
  const client = createClient({
    space: process.env.CF_SPACE_ID || '',
    accessToken: process.env.CF_ACCESS_TOKEN || '',
  })
  return client
}
