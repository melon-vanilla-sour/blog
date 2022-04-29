import Image from 'next/image'

import { Center, Heading, Box } from '@chakra-ui/react'
import Link from 'next/link'
import dayjs from 'dayjs'

const getThumbnailUrl = (post) => {
  for (let node of post.fields.content.content) {
    if (node.nodeType == 'embedded-asset-block') {
      return node.data.target.fields.file.url
    }
  }
}

const thumbnailFactory = (post) => {
  for (let node of post.fields.content.content) {
    if (node.nodeType == 'embedded-asset-block') {
      return (
        <Image
          src={`https:${node.data.target.fields.file.url}`}
          layout="fill"
          objectFit="contain"
        ></Image>
      )
    }
  }
}

const PostThumbnail = ({ post }) => {
  const createdAt = dayjs(post.sys.createdAt)

  return (
    <Box key={post.sys.id} border="2px solid" p="6" mt="6" mb="6" rounded="md">
      <Link href={`/${post.fields.slug}`}>
        <a>
          <Box height="200px" position="relative">
            {thumbnailFactory(post)}
          </Box>
          <h2>{post.fields.title}</h2>
          <p>Posted on {createdAt.format('DD/MM/YYYY')}</p>
        </a>
      </Link>
    </Box>
  )
}

export default PostThumbnail
