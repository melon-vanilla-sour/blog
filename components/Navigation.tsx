import { Center, Heading, Box, VStack, Text, Flex, HStack } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import Link from 'next/link'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/button'

const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <VStack
      w={['0', '0', '150px', '190px']}
      position="fixed"
      height="full"
      justify="start"
      display={['none', 'none', 'flex']}
      paddingTop="20vh"
      paddingLeft={8}
    >
      <Heading size="md">Melon Vanilla Sour</Heading>
      <Link href="/">
        <Text cursor="pointer">About Me</Text>
      </Link>
      <Link href="/posts/1">
        <Text cursor="pointer">Posts</Text>
      </Link>
      <Link href="/projects">
        <Text cursor="pointer">Projects</Text>
      </Link>
      <IconButton mt={4} aria-label="Toggle Mode" onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </VStack>
  )
}

export default Navigation
