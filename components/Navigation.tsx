import { Center, Heading, Box, VStack, Text, Flex, HStack } from '@chakra-ui/react'
import Link from 'next/link'

const Navigation = () => {
  return (
    <VStack
      w="200px"
      position="fixed"
      height="full"
      justify="start"
      display={['none', 'none', 'flex']}
      paddingTop="20vh"
    >
      <Heading size="md">Melon Vanilla Sour</Heading>
      <Link href="/">
        <Text cursor="pointer">About Me</Text>
      </Link>
      <Link href="/posts">
        <Text cursor="pointer">Posts</Text>
      </Link>
      <Link href="/projects">
        <Text cursor="pointer">Projects</Text>
      </Link>
    </VStack>
  )
}

export default Navigation
