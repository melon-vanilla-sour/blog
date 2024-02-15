import { Heading, Box, useColorModeValue, Text, Flex, Icon, Spacer, filter, Image } from '@chakra-ui/react'
import { TbWriting } from 'react-icons/tb'
import { BiFolderOpen } from 'react-icons/bi'
import Link from 'next/link'
// import Image from 'next/future/image'
import dayjs from 'dayjs'
import matter from 'gray-matter'

import { capitalizeString, getImageUrls, getSlugFromTitle } from '../lib/utils'
import { getImage } from 'plaiceholder/dist/get-image'

export const CardTextContainer = ({ children, ...props }) => {
  return (
    <Flex
      flexDir="column"
      alignItems="start"
      justifyContent="space-around"
      display="flex"
      padding={3}
      w="full"
      position="relative"
      // zIndex="-2"
      // _before={{
      //   backgroundImage: backgroundImage,
      //   backgroundSize: '100%',
      //   filter: 'saturate(50%) brightness(50%)',
      //   zIndex: '-1',
      //   position: 'absolute',
      // }}
      {...props}
    >
      {children}
    </Flex>
  )
}

const Card = ({ post }) => {
  const {
    content,
    data: { title = '', category = '', tags = [], created },
  } = matter(post)
  const thumbnail = getImageUrls(content) ? getImageUrls(content)[0] : null
  const slug = getSlugFromTitle(title)
  return (
    <Box className="card">
      <Link href={`/post/${slug}`}>
        <a>
          <Flex h={{ base: '24', sm: '24' }}>
            <Flex flex="40%">
              <Flex
                className="date"
                align="center"
                justify="center"
                p={3}
                borderRight="1px solid"
                borderColor={useColorModeValue('blackAlpha.400', 'whiteAlpha.400')}
                minW={{ base: '20', sm: '24' }}
              >
                <Text className="cardDate" fontSize={{ base: 'md', md: 'xl' }} fontWeight="bold">
                  {created && dayjs(created).format('DD/MMM')}
                </Text>
              </Flex>
              <CardTextContainer>
                <Heading
                  fontSize={{ base: 'lg', sm: 'lg' }}
                  textAlign="start"
                // Don't want to cause height shift within 2 lines, somehow isn't 2.4em (1.2 * 2)
                // minH="2.2em"
                // noOfLines={2}
                >
                  {title && title}
                </Heading>

                <Flex alignItems="center" mt={1}>
                  <Icon as={BiFolderOpen} marginEnd={2} />
                  <Text noOfLines={1} fontSize={{ base: 'sm', md: 'lg' }}>
                    {category && capitalizeString(category)}
                  </Text>
                  <Box mx={2}></Box>

                  {/* <Icon as={TbWriting} marginEnd={2} />
                  <Text noOfLines={1} fontSize={{ base: 'sm', md: 'lg' }}>
                    {tags.join(', ')}
                  </Text> */}
                </Flex>
              </CardTextContainer>
            </Flex>

            <Flex
              flex="1"
              display={{ base: 'none', sm: 'flex' }}
              filter={'saturate(130%) brightness(110%)'}
              borderLeft="1px solid"
              borderColor={useColorModeValue('blackAlpha.400', 'whiteAlpha.400')}
              // alignItems='center'
              justifyContent='center'
            >
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt="Post Thumbnail"
                  objectFit="cover"
                  overflow="hidden"
                  width='100%'
                ></Image>
              ) : (
                <Image
                  src="/melon-sour.ico"
                  alt="Post Thumbnail"
                  objectFit="contain"
                ></Image>
              )}
            </Flex>
          </Flex>
        </a>
      </Link>
    </Box>
  )
}

export default Card
