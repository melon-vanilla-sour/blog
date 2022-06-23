// import Image from 'next/image'

import { Heading, Box, useColorModeValue, Text, Image, Flex, Icon, Spacer } from '@chakra-ui/react'
import { TbWriting, TbListDetails } from 'react-icons/tb'
import { BiFolderOpen } from 'react-icons/bi'
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
    <Box className="card">
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
            <Flex className="cardText">
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
                <Icon as={BiFolderOpen} marginEnd={2} />
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
