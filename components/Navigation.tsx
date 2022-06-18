import { Center, Heading, Box, VStack, Text, Flex, HStack, Spacer } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import Link from 'next/link'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/button'

const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex w="full" display={{ base: 'none', md: 'flex' }} alignItems="center" paddingX={8}>
      <Heading size="md">Melon Vanilla Sour</Heading>
      <Spacer />
      <Link href="/">
        <Text cursor="pointer">About Me</Text>
      </Link>
      <Spacer />
      <Link href="/posts/1">
        <Text cursor="pointer">Posts</Text>
      </Link>
      <Spacer />
      <Link href="/projects">
        <Text cursor="pointer">Projects</Text>
      </Link>
      <Spacer />
      <IconButton mt={4} aria-label="Toggle Mode" onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </Flex>
  )
}

export default Navigation
