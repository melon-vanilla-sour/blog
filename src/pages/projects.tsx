import { Box, Heading, HStack, VStack } from '@chakra-ui/react'
import { buildClient } from '../lib/contentful'
import Link from 'next/link'
import Image from 'next/image'

import { Center, SimpleGrid, Text } from '@chakra-ui/react'

import Base from '../../components/base'
import Head from 'next/head'

function Projects() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Base>
        <Heading mb="40px">Projects</Heading>
        <VStack alignItems="start">
          <a href="https://holoview.vercel.app/" target="_blank">
            <Box
              _hover={{ transform: 'translate(-8px, 0px)' }}
              transition="all 0.1s ease-out "
              boxShadow="md"
              padding={4}
            >
              <HStack>
                <Box height="200px" width="300px" position="relative">
                  <Image src="/projects/holoview-thumbnail.png" layout="fill" objectFit="contain" />
                </Box>
                <VStack alignItems="start">
                  <h2>Holoview</h2>
                  <p>A page to watch Hololive VTubers</p>
                </VStack>
              </HStack>
            </Box>
          </a>
        </VStack>
      </Base>
    </>
  )
}

export default Projects
