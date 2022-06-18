import { Box, Heading, HStack, VStack } from '@chakra-ui/react'
import { buildClient } from '../lib/contentful'
import Link from 'next/link'
import Image from 'next/image'

import { Center, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'

import Base from '../../components/layout/base'
import Head from 'next/head'

import holoview from '../../public/projects/holoview-thumbnail.png'

function Projects() {
  return (
    <>
      <Heading mb="40px">Projects</Heading>
      <VStack alignItems="start">
        <a href="https://holoview.vercel.app/" target="_blank" rel="noreferrer">
          <Box
            // _hover={{ transform: 'translate(-8px, 0px)' }}
            // transition="all 0.1s ease-out "
            // background={useColorModeValue('white', 'gray.700')}
            className="glass"
            _hover={useColorModeValue({ background: 'gray.200' }, { background: 'gray.600' })}
            boxShadow="md"
            padding={4}
            borderRadius="sm"
          >
            <HStack minWidth={['180px', '500px', '600px', '800px']}>
              <Box height="200px" width="250px" position="relative">
                <Image
                  src={holoview}
                  layout="fill"
                  objectFit="contain"
                  priority
                  alt="Project Thumbnail"
                />
              </Box>
              <VStack alignItems="start" display={['none', 'flex', 'flex']}>
                <Heading size="md">HoloView</Heading>
                <Text>A page to watch Hololive VTubers</Text>
              </VStack>
            </HStack>
            <Box display={['block', 'none', 'none']}>
              <Heading size="md">HoloView</Heading>
              <Text align="center">A page to watch Hololive VTubers</Text>
            </Box>
          </Box>
        </a>
      </VStack>
    </>
  )
}

export default Projects
