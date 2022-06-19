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

const Card = ({ post, index }) => {
  const createdAt = dayjs(post.sys.createdAt)
  const thumbnailURI = getThumbnailURI(post)

  return (
    <Box
      boxShadow="md"
      paddingBottom={2}
      bg={useColorModeValue('white', 'gray.700')}
      _hover={useColorModeValue(
        { transform: 'scale(1.02)', boxShadow: 'lg' },
        { background: 'gray.700', transform: 'scale(1.02)', boxShadow: 'lg' }
      )}
      transition="transform .1s"
      // _hover={useColorModeValue({ outline: 'solid  black 2px ' }, { outline: 'solid white' })}
      borderRadius="lg"
      overflow="hidden"
      w="full"
      boxSizing="content-box"
    >
      <Link href={`/post/${post.fields.slug}`}>
        <a>
          <Flex direction="column">
            <Box position="relative" filter={'saturate(130%) brightness(110%)'}>
              {/* <Image
                src={thumbnailURI}
                layout="fill"
                objectFit="contain"
                priority={index < 5 ? true : false}
              ></Image> */}
              <Image src={thumbnailURI} alt="Post Thumbnail"></Image>
            </Box>
            <Flex
              flexDir="column"
              alignItems="start"
              justifyContent="center"
              display="flex"
              flex="1"
              padding={3}
            >
              <Heading
                fontSize={{ base: 'md', md: 'lg' }}
                textAlign="start"
                // Don't want to cause height shift within 2 lines, somehow isn't 2.4em (1.2 * 2)
                minH="2.6em"
                noOfLines={2}
              >
                {post.fields.title}
              </Heading>
              <Text>{createdAt.format('DD/MM/YYYY')}</Text>
            </Flex>
          </Flex>
        </a>
      </Link>
    </Box>
  )
}

export default Card
