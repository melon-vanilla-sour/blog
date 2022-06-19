import { Box, Heading, HStack, VStack, Flex, Grid } from '@chakra-ui/react'
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
      <Heading my={8}>Projects</Heading>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} gap={6}>
        <Box
          boxShadow="md"
          paddingBottom={2}
          _hover={useColorModeValue(
            { background: 'blue.300', transform: 'scale(1.02)' },
            { background: 'gray.700', transform: 'scale(1.02)' }
          )}
          transition="transform .1s"
          // _hover={useColorModeValue({ outline: 'solid  black 2px ' }, { outline: 'solid white' })}
          borderRadius="lg"
          overflow="hidden"
          w="full"
          className="glass"
          boxSizing="content-box"
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
                alignItems="start"
                justifyContent="center"
                display="flex"
                flex="1"
                padding={3}
              >
                <Heading
                  fontSize={{ base: 'md', md: 'lg' }}
                  textAlign="start"
                  // Don't want to cause height shift within 2 lines, somehow isn't 2.4em (1.2 * 2)
                  minH="2.6em"
                  noOfLines={2}
                >
                  HoloView
                </Heading>
                <Text>A page to watch Hololive VTubers</Text>
              </Flex>
            </Flex>
          </a>
        </Box>
      </Grid>
    </>
  )
}

export default Projects
