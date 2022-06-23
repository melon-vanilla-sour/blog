import { Box, Heading, Text, useColorModeValue, Flex, Grid, GridItem, Icon } from '@chakra-ui/react'
import { BiWrench } from 'react-icons/bi'
import Image from 'next/image'

import holoview from '../../public/projects/holoview-thumbnail.png'

function Projects() {
  return (
    <>
      <Heading my={8}>Projects</Heading>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} gap={6}>
        <GridItem>
          <Box className="card">
            <a href="https://holoview.vercel.app/" target="_blank" rel="noreferrer">
              <Flex direction="column">
                <Box position="relative" filter={'saturate(130%) brightness(110%)'}>
                  {/* <Image
                src={thumbnailURI}
                layout="fill"
                objectFit="contain"
                priority={index < 5 ? true : false}
              ></Image> */}
                  <Image src={holoview} alt="Post Thumbnail"></Image>
                </Box>
                <Flex className="cardText">
                  <Heading
                    fontSize={{ base: 'md', md: 'lg' }}
                    textAlign="start"
                    // Don't want to cause height shift within 2 lines, somehow isn't 2.4em (1.2 * 2)
                    minH="2.6em"
                    noOfLines={2}
                  >
                    HoloView
                  </Heading>

                  <Flex alignItems="center">A page to watch Hololive VTubers</Flex>
                  <Flex alignItems="center">
                    <Icon as={BiWrench} marginEnd={2} />
                    React, Chakra UI, Vercel
                  </Flex>
                </Flex>
              </Flex>
            </a>
          </Box>
        </GridItem>
      </Grid>
    </>
  )
}

export default Projects
