import { Center, Heading, Box, VStack, Text, Flex, HStack } from '@chakra-ui/react'
import Link from 'next/link'

const MobileNavigation = () => {
  return (
    <HStack
      w="100%"
      position="fixed"
      bottom="0px"
      display={['flex', 'flex', 'none']}
      backgroundColor="white"
      boxShadow="dark-lg"
      justify="space-around"
    >
      <Link href="/">
        <Text cursor="pointer">About Me</Text>
      </Link>
      <Link href="/posts">
        <Text cursor="pointer">Blog</Text>
      </Link>
      <Link href="/projects">
        <Text cursor="pointer">Projects</Text>
      </Link>
    </HStack>
  )
}

export default MobileNavigation
