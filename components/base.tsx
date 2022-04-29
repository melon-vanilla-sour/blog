import { Center, Heading, Box, VStack, Text, Flex } from '@chakra-ui/react'
import Link from 'next/link'

const Base = ({ children }) => {
  return (
    <div>
      <VStack w="200px" position="absolute" height="full" justify="center">
        <Link href="/">
          <Text cursor="pointer">About Me</Text>
        </Link>
        <Link href="/blog">
          <Text cursor="pointer">Blog</Text>
        </Link>
        <Link href="/projects">
          <Text cursor="pointer">Projects</Text>
        </Link>
      </VStack>
      <Center flex="1">
        <Box
          boxShadow="24px 24px 48px #d1d1d1, -24px -24px 48px #ffffff"
          p="6"
          mt="6"
          mb="6"
          rounded="md"
          width={['100%', '100%', '70%']}
          minH="calc(100vh)"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Heading textDecoration="underline" textUnderlineOffset="5px">
            Melon Vanilla Sour
          </Heading>
          <>{children}</>
        </Box>
      </Center>
    </div>
  )
}

export default Base
