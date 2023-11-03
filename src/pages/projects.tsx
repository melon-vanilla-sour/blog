import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
} from '@chakra-ui/react'
import Link from 'next/link'
import { BiWrench } from 'react-icons/bi'
// import Image from 'next/image'

import { CardTextContainer } from '../components/Card'

function Projects() {
  return (
    <>
      <Grid my={8} templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} gap={6}>
        <GridItem>
          <Box className="card">
            <a href="https://holoview.vercel.app/" target="_blank" rel="noreferrer">
              <Flex direction="column">
                <Box
                  as={Image}
                  src={'projects/holoview-thumbnail.png?fm=webp&h=600'}
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
                    // minH="2.6em"
                    noOfLines={2}
                  >
                    Holoview
                  </Heading>

                  <Flex alignItems="center">A page to watch Hololive VTubers</Flex>
                  <Flex alignItems="center">
                    <Icon as={BiWrench} marginEnd={2} />
                    React, Chakra UI, Vercel
                  </Flex>
                </CardTextContainer>
              </Flex>
            </a>
          </Box>
        </GridItem>
        <GridItem>
          <Link href="/post/making-my-blog-with-next-js-vercel-and-contentful">
            <Box className="card">
              <Flex direction="column">
                <Box
                  as={Image}
                  src={'projects/blog-thumbnail.png'}
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
                    // minH="2.6em"
                    noOfLines={2}
                  >
                    Blog
                  </Heading>

                  <Flex alignItems="center">A static generated blog</Flex>
                  <Flex alignItems="center">
                    <Icon as={BiWrench} marginEnd={2} />
                    Next.js, Chakra UI, Contentful, Vercel
                  </Flex>
                </CardTextContainer>
              </Flex>
            </Box>
          </Link>
        </GridItem>
      </Grid>
    </>
  )
}

export default Projects
