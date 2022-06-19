import { Box, Heading, HStack, VStack, Flex } from '@chakra-ui/react'
import { buildClient } from '../lib/contentful'
import Link from 'next/link'
import Image from 'next/image'

import { Center, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react'

import Base from '../components/layout/base'
import Head from 'next/head'

import holoview from '../../public/projects/holoview-thumbnail.png'

function Projects() {
  return (
    <>
      <Heading my={4}>Projects</Heading>
      <VStack alignItems="center" w="full">
        <Box
          boxShadow="md"
          padding={4}
          _hover={useColorModeValue({ background: 'blue.300' }, { background: 'gray.600' })}
          borderRadius="lg"
          w="full"
          className="glass"
        >
          <a href="https://holoview.vercel.app/" target="_blank" rel="noreferrer">
            <Flex>
              <Box height="200px" width="250px" position="relative">
                <Image
                  src={holoview}
                  layout="fill"
                  objectFit="contain"
                  priority
                  alt="Project Thumbnail"
                />
              </Box>
              <Flex
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                display={['none', 'flex', 'flex']}
                flex="1"
                paddingStart={1}
              >
                <Heading size="md">HoloView</Heading>
                <Text>A page to watch Hololive VTubers</Text>
              </Flex>
            </Flex>
            <Box display={['block', 'none', 'none']}>
              <Heading size="md">HoloView</Heading>
              <Text align="center">A page to watch Hololive VTubers</Text>
            </Box>
          </a>
        </Box>
      </VStack>
    </>
  )
}

export default Projects
