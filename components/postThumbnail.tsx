// import Image from 'next/image'

import {
  Center,
  Heading,
  Box,
  HStack,
  VStack,
  useColorModeValue,
  Text,
  Image,
  Flex,
} from '@chakra-ui/react'
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
      boxShadow="md"
      padding={4}
      _hover={useColorModeValue({ background: 'gray.200' }, { background: 'gray.600' })}
      borderRadius="lg"
      w="full"
      maxW="1000px"
      className="glass"
    >
      <Link href={`/post/${post.fields.slug}`}>
        <a>
          <Flex justifyContent="center">
            <Box
              height="200px"
              width={'300px'}
              position="relative"
              filter={'saturate(130%) brightness(110%)'}
            >
              {/* <Image
                src={thumbnailURI}
                layout="fill"
                objectFit="contain"
                priority={index < 5 ? true : false}
              ></Image> */}
              <Image src={thumbnailURI} maxW={'300px'} alt="Post Thumbnail"></Image>
            </Box>
            <Flex
              flexDir="column"
              alignItems="center"
              justifyContent="center"
              display={['none', 'flex', 'flex']}
              flex="1"
              paddingStart={1}
            >
              <Heading size="md">{post.fields.title}</Heading>
              <Text>Posted on {createdAt.format('DD/MM/YYYY')}</Text>
            </Flex>
          </Flex>
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
