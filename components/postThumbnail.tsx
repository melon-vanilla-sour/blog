import Image from 'next/image'

import { Center, Heading, Box, HStack, VStack, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import dayjs from 'dayjs'

const thumbnailFactory = (post, index) => {
  for (let node of post.fields.content.content) {
    if (node.nodeType == 'embedded-asset-block') {
      return (
        <Image
          src={`https:${node.data.target.fields.file.url}`}
          layout="fill"
          objectFit="contain"
          priority={index < 5 ? true : false}
        ></Image>
      )
    }
  }
}

const PostThumbnail = ({ post, index }) => {
  const createdAt = dayjs(post.sys.createdAt)

  return (
    <Box
      // _hover={{ transform: 'translate(-8px, 0px)' }}

      filter={'saturate(130%)'}
      transition="all 0.1s ease-out"
      boxShadow="md"
      padding={4}
      background={useColorModeValue('white', 'gray.700')}
      _hover={useColorModeValue({ background: 'gray.100' }, { background: 'gray.600' })}
      borderRadius="sm"
      minWidth={['0px', '600px', '600px', '800px']}
    >
      <Link href={`/${post.fields.slug}`}>
        <a>
          <HStack>
            <Box height="200px" width={'300px'} position="relative">
              {thumbnailFactory(post, index)}
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
