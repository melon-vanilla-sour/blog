import { Heading, Box, useColorModeValue, Text, Flex, Icon, Spacer, filter, Image } from '@chakra-ui/react'
import { BiFolderOpen } from 'react-icons/bi'
import Link from 'next/link'
import dayjs from 'dayjs'
import matter from 'gray-matter'

import { capitalizeString, doNotRender, getImageUrls, getSlugFromTitle } from '../lib/utils'

export const CardTextContainer = ({ children, ...props }) => {
  return (
    <Flex
      flexDir="column"
      alignItems="start"
      justifyContent="space-evenly"
      display="flex"
      padding={3}
      w="full"
      position="relative"
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
  if (doNotRender(slug)) {
    return null
  } else {
    return (
      <Box className="card">
        <Link href={`/post/${slug}`}>
          <a>
            <Flex h={{ base: '28', sm: '28' }}>
              <Flex flex="40%">
                <Flex
                  className="date"
                  align="center"
                  justify="center"
                  p={3}
                  // borderRight="1px solid"
                  // borderColor={useColorModeValue('blackAlpha.400', 'whiteAlpha.400')}
                  minW={{ base: '20', sm: '24' }}
                >
                  <Text className="cardDate" fontSize={{ base: 'xl', md: 'xl' }} fontWeight="bold">
                    {created && dayjs(created).format('DD/MMM')}
                  </Text>
                </Flex>
                <CardTextContainer>
                  <Heading
                    fontSize={{ base: 'lg', sm: 'lg' }}
                    textAlign="start"
                  >
                    {title && title}
                  </Heading>

                  <Flex alignItems="center" mt={1}>
                    <Icon as={BiFolderOpen} marginEnd={2} />
                    <Text noOfLines={1} fontSize={{ base: 'lg', md: 'lg' }}>
                      {category && capitalizeString(category)}
                    </Text>
                    <Box mx={2}></Box>
                  </Flex>
                </CardTextContainer>
              </Flex>

              <Flex
                flex="1"
                display={{ base: 'none', sm: 'flex' }}
                filter={'saturate(130%) brightness(110%)'}
                // borderLeft="1px solid"
                // borderColor={useColorModeValue('blackAlpha.400', 'whiteAlpha.400')}
                justifyContent='center'
              >
                <Image
                  src={thumbnail ?? "/ogp.png"}
                  alt="Post Thumbnail"
                  objectFit="cover"
                  overflow="hidden"
                  width='100%'
                ></Image>
              </Flex>
            </Flex>
          </a>
        </Link>
      </Box>
    )
  }
}

export default Card
