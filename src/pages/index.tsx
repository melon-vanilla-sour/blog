import { Box, Heading, useColorModeValue } from '@chakra-ui/react'
import { buildClient } from '../lib/contentful'
import Link from 'next/link'

import { Center, SimpleGrid, Text, Image } from '@chakra-ui/react'

import Base from '../../components/layout/base'
import Head from 'next/head'
import Card from '../../components/Card'

function HomePage({ posts }) {
  return (
    <>
      <Box>
        <Heading mb="40px">About Me</Heading>
        <Text>Web Developer</Text>
        <br />

        <Text>Contact: melonvanillasour@gmail.com</Text>
        <br />
        <Text>I'm pretty good with these things</Text>

        <SimpleGrid mt={25} columns={4} spacing={8}>
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
        </SimpleGrid>

        <Text>I'm ok with these things</Text>
        <SimpleGrid mt={25} columns={4} spacing={8}>
          <img width="100px" src="icons/ruby.svg" alt="javascript-icon" />
          <img width="100px" src="icons/php.svg" alt="javascript-icon" />
        </SimpleGrid>
      </Box>
    </>
  )
}

export default HomePage
