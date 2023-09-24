import { createClient } from 'contentful'

export const buildClient = () => {
  const client = createClient({
    space: process.env.CF_SPACE_ID || '',
    accessToken: process.env.CF_ACCESS_TOKEN || '',
  })
  return client
}

export const postsPerPage = 10
