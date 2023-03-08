import { Box, Flex, Grid, Heading, useColorModeValue, Text, Image } from '@chakra-ui/react'

interface TechIconProps {
  site?: string
  image: string
  name: string
}

const TechIcon = ({ site, image, name }: TechIconProps) => {
  return (
    <Flex flexDir="column">
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
      <Box my={8}>
        <Flex flexDir="column" alignItems="center">
          <Text>Hi I'm a Web Developer in Tokyo</Text>
        </Flex>
        <Flex flexDir="column" alignItems="center">
          <Grid
            className="iconGrid"
            my={{ base: 4, sm: 6 }}
            templateColumns={{ base: 'repeat(3, 1fr)', sm: 'repeat(5, 1fr)' }}
          >
            <TechIcon image="icons/javascript.svg" name="Javascript" />
            <TechIcon site="https://nextjs.org/" image="icons/nextdotjs.svg" name="Next.js" />
            <TechIcon image="icons/react.svg" name="React" />
            <TechIcon image="icons/chakraui.svg" name="Chakra UI" />
            <TechIcon site="https://nodejs.org/en/" image="icons/nodedotjs.svg" name="Node.js" />
            {/* <TechIcon image="icons/ruby.svg" name="Ruby" />
            <TechIcon image="icons/php.svg" name="PHP" /> */}
          </Grid>
        </Flex>
      </Box>
    </>
  )
}

export default HomePage
