import Image from 'next/image'

import { Center, Heading, Box, HStack, VStack } from '@chakra-ui/react'
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
    <Box
      key={post.sys.id}
      _hover={{ transform: 'translate(-8px, 0px)' }}
      transition="all 0.1s ease-out"
      boxShadow="md"
      padding={4}
    >
      <Link href={`/${post.fields.slug}`}>
        <a>
          <HStack>
            <Box height="200px" width="300px" position="relative">
              {thumbnailFactory(post)}
            </Box>
            <VStack alignItems="start">
              <h2>{post.fields.title}</h2>
              <p>Posted on {createdAt.format('DD/MM/YYYY')}</p>
            </VStack>
          </HStack>
        </a>
      </Link>
    </Box>
  )
}

export default PostThumbnail
