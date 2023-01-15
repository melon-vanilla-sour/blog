import { Heading, Box, useColorModeValue, Text, Flex, Icon, Spacer, Image } from '@chakra-ui/react'
import { TbWriting } from 'react-icons/tb'
import { BiFolderOpen } from 'react-icons/bi'
import Link from 'next/link'
// import Image from 'next/future/image'
import dayjs from 'dayjs'
import { getPlaiceholder } from 'plaiceholder'

import { capitalizeString } from '../lib/utils'

const getThumbnailURI = (post) => {
  for (let node of post.fields.content.content) {
    if (node.nodeType == 'embedded-asset-block') {
      return `https:${node.data.target.fields.file.url}`
    }
  }
}

export const CardTextContainer = ({ children, ...props }) => {
  return (
    <Flex
      flexDir="column"
      alignItems="start"
      justifyContent="center"
      display="flex"
      flex={1}
      padding={3}
      {...props}
    >
      {children}
    </Flex>
  )
}

const Card = ({ post, index }) => {
  const createdAt = dayjs(post.sys.createdAt)
  const thumbnailURI = getThumbnailURI(post)

  return (
    <Box className="card">
      <Link href={`/post/${post.fields.slug}`}>
        <a>
          <Flex direction="column">
            <Box
              as={Image}
              src={thumbnailURI}
              alt="Post Thumbnail"
              position="relative"
              filter={'saturate(130%) brightness(110%)'}
              w="420px"
              h="240px"
              objectFit="cover"
            ></Box>
            <CardTextContainer>
              <Heading
                fontSize={{ base: 'md', md: 'lg' }}
                textAlign="start"
                // Don't want to cause height shift within 2 lines, somehow isn't 2.4em (1.2 * 2)
                minH="2.6em"
                noOfLines={2}
              >
                {post.fields.title}
              </Heading>

              <Flex alignItems="center" flexWrap="wrap" minH="2.6em">
                <Icon as={BiFolderOpen} marginEnd={2} />
                {capitalizeString(post.fields.category)}
                <Box mx={2}></Box>

                <Icon as={TbWriting} marginEnd={2} />
                {createdAt.format('DD/MM/YYYY')}
              </Flex>
            </CardTextContainer>
          </Flex>
        </a>
      </Link>
    </Box>
  )
}

export default Card
