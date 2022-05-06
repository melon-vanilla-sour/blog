import Image from 'next/image'

import { Center, Heading, Box, HStack, VStack, useColorModeValue, Text } from '@chakra-ui/react'
import Link from 'next/link'
import dayjs from 'dayjs'
import { getPlaiceholder } from 'plaiceholder'

const getThumbnailURI = (post) => {
  for (let node of post.fields.content.content) {
    if (node.nodeType == 'embedded-asset-block') {
      return `https:${node.data.target.fields.file.url}`
    }
  }
}

const PostThumbnail = ({ post, index }) => {
  const createdAt = dayjs(post.sys.createdAt)
  const thumbnailURI = getThumbnailURI(post)

  return (
    <Box
      // _hover={{ transform: 'translate(-8px, 0px)' }}
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
            <Box
              height="200px"
              width={'300px'}
              position="relative"
              filter={'saturate(130%) brightness(110%)'}
            >
              <Image
                src={thumbnailURI}
                layout="fill"
                objectFit="contain"
                priority={index < 5 ? true : false}
              ></Image>
            </Box>
            <VStack alignItems="start" display={['none', 'flex', 'flex']}>
              <Heading size="md">{post.fields.title}</Heading>
              <Text>Posted on {createdAt.format('DD/MM/YYYY')}</Text>
            </VStack>
          </HStack>
          <Box display={['block', 'none', 'none']}>
            <Heading size="md">{post.fields.title}</Heading>
            <Text align="center">Posted on {createdAt.format('DD/MM/YYYY')}</Text>
          </Box>
        </a>
      </Link>
    </Box>
  )
}

export default PostThumbnail
