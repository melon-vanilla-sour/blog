import { Box, Flex, Grid, Heading, useColorModeValue, Text, Image } from '@chakra-ui/react'

function HomePage({ posts }) {
  return (
    <>
      <Heading my={8}>About</Heading>
      <Box>
        <Flex flexDir="column" alignItems="center">
          <Text>Web Developer</Text>
          <br />
          <Text>I'm pretty good with these things</Text>
        </Flex>
        <Flex flexDir="column" alignItems="center">
          <Grid
            className="iconGrid"
            my={{ base: 8, sm: 12 }}
            templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)' }}
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
            className="iconGrid"
            my={{ base: 8, sm: 12 }}
            templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)' }}
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
