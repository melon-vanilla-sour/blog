import { Center, Heading, Box, VStack, Text, Flex, HStack } from '@chakra-ui/react'
import Link from 'next/link'

const Base = ({ children }) => {
  return (
    <Box background="#ECECEC">
      <VStack
        w="200px"
        position="fixed"
        height="full"
        justify="center"
        display={['none', 'none', 'flex']}
      >
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
          background="white"
        >
          <Heading textDecoration="underline" textUnderlineOffset="5px">
            Melon Vanilla Sour
          </Heading>
          <>{children}</>
        </Box>
      </Center>
      <HStack
        w="100%"
        position="fixed"
        bottom="0px"
        justify="center"
        display={['flex', 'flex', 'none']}
        backgroundColor="white"
        border="1px solid"
      >
        <Link href="/">
          <Text cursor="pointer">About Me</Text>
        </Link>
        <Link href="/blog">
          <Text cursor="pointer">Blog</Text>
        </Link>
        <Link href="/projects">
          <Text cursor="pointer">Projects</Text>
        </Link>
      </HStack>
    </Box>
  )
}

export default Base
