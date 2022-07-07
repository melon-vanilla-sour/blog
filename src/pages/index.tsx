import { Box, Flex, Grid, Heading, useColorModeValue, Text, Image } from '@chakra-ui/react'
import { constants } from 'buffer'

interface TechIconProps {
  site?: string
  image: string
  name: string
}

const TechIcon: React.FC<TechIconProps> = ({ site, image, name }) => {
  return (
    <Flex flexDir="column" w="80px">
      <a href={site}>
        <img src={image} />
      </a>
      <Text fontSize="sm" textAlign="center" marginTop={4}>
        {name}
      </Text>
    </Flex>
  )
}

function HomePage({ posts }) {
  return (
    <>
      <Heading my={8} size="lg">
        About
      </Heading>
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
            templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(6, 1fr)' }}
          >
            <TechIcon image="icons/javascript.svg" name="Javascript" />
            <TechIcon site="https://nextjs.org/" image="icons/nextdotjs.svg" name="Next.js" />
            <TechIcon image="icons/react.svg" name="React" />
            <TechIcon image="icons/chakraui.svg" name="Chakra UI" />
            <TechIcon site="https://nodejs.org/en/" image="icons/nodedotjs.svg" name="Node.js" />
          </Grid>
        </Flex>
        <Flex flexDir="column" alignItems="center">
          <Text>I'm ok with these things</Text>
        </Flex>
        <Flex flexDir="column" alignItems="center">
          <Grid
            className="iconGrid"
            my={{ base: 8, sm: 12 }}
            templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(6, 1fr)' }}
          >
            <TechIcon image="icons/ruby.svg" name="Ruby" />
            <TechIcon image="icons/php.svg" name="PHP" />
          </Grid>
        </Flex>
      </Box>
    </>
  )
}

export default HomePage
