import { Box, Flex, Grid, Heading, useColorModeValue } from '@chakra-ui/react'
import { buildClient } from '../lib/contentful'
import Link from 'next/link'

import { Center, SimpleGrid, Text, Image } from '@chakra-ui/react'

import Base from '../components/layout/base'
import Head from 'next/head'
import Card from '../components/Card'

function HomePage({ posts }) {
  return (
    <>
      <Box>
        <Heading my={8}>About Me</Heading>
        <Flex flexDir="column" alignItems="center">
          <Text>Web Developer</Text>
          <br />
          <Text>I'm pretty good with these things</Text>
        </Flex>
        <Flex flexDir="column" alignItems="center">
          <Grid
            my={{ base: 10, sm: 16 }}
            templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)' }}
            gap={8}
            maxW="lg"
          >
            <Image
              width="100px"
              src="icons/javascript.svg"
              alt="javascript-icon"
              _hover={useColorModeValue({ background: 'gray.600' }, { background: 'gray.300' })}
            />
            <a href="https://nextjs.org/">
              <img width="100px" src="icons/nextdotjs.svg" alt="javascript-icon" />
            </a>
            <img width="100px" src="icons/react.svg" alt="javascript-icon" />
            <img width="100px" src="icons/chakraui.svg" alt="javascript-icon" />
            <a href="https://nodejs.org/en/">
              <img width="100px" src="icons/nodedotjs.svg" alt="javascript-icon" />
            </a>
          </Grid>
        </Flex>
        <Flex flexDir="column" alignItems="center">
          <Text>I'm ok with these things</Text>
        </Flex>
        <Flex flexDir="column" alignItems="center">
          <Grid
            my={{ base: 10, sm: 16 }}
            templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)' }}
            gap={8}
            maxW="lg"
          >
            <img width="100px" src="icons/ruby.svg" alt="javascript-icon" />
            <img width="100px" src="icons/php.svg" alt="javascript-icon" />
          </Grid>
        </Flex>
      </Box>
    </>
  )
}

export default HomePage
