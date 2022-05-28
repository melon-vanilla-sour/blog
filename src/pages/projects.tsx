import { Box, Heading, HStack, VStack } from '@chakra-ui/react'
import { buildClient } from '../lib/contentful'
import Link from 'next/link'
import Image from 'next/image'

import { Center, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'

import Base from '../../components/base'
import Head from 'next/head'

import holoview from '../../public/projects/holoview-thumbnail.png'

function Projects() {
  return (
    <Base>
      <Heading mb="40px">Projects</Heading>
      <VStack alignItems="start">
        <a href="https://holoview.vercel.app/" target="_blank">
          <Box
            // _hover={{ transform: 'translate(-8px, 0px)' }}
            // transition="all 0.1s ease-out "
            background={useColorModeValue('white', 'gray.700')}
            _hover={useColorModeValue({ background: 'gray.100' }, { background: 'gray.600' })}
            boxShadow="md"
            padding={4}
            minWidth={['0', '600px', '600px', '800px']}
            borderRadius="sm"
          >
            <HStack>
              <Box height="200px" width="300px" position="relative">
                <Image src={holoview} layout="fill" objectFit="contain" priority />
              </Box>
              <VStack alignItems="start">
                <Heading size="md">HoloView</Heading>
                <Text>A page to watch Hololive VTubers</Text>
              </VStack>
            </HStack>
          </Box>
        </a>
      </VStack>
    </Base>
  )
}

export default Projects
