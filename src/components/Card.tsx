// import Image from 'next/image'

import { Heading, Box, useColorModeValue, Text, Image, Flex, Icon, Spacer } from '@chakra-ui/react'
import { TbWriting, TbListDetails } from 'react-icons/tb'
import { EditIcon } from '@chakra-ui/icons'
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
        {
          transform: 'scale(1.02)',
          boxShadow: 'lg',
          outline: 'solid 1px',
          outlineColor: 'orange.200',
        },
        {
          transform: 'scale(1.02)',
          boxShadow: 'lg',
          outline: 'solid 1px',
          outlineColor: 'gray.500',
        }
      )}
      transition="transform .1s"
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

              <Flex alignItems="center">
                <Icon as={TbListDetails} marginEnd={2} />
                {post.fields.category}
              </Flex>
              <Flex alignItems="center">
                <Icon as={TbWriting} marginEnd={2} />
                {createdAt.format('DD/MM/YYYY')}
              </Flex>
            </Flex>
          </Flex>
        </a>
      </Link>
    </Box>
  )
}

export default Card
