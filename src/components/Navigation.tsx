import { Center, Heading, Box, VStack, Text, Flex, HStack, Spacer } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import Link from 'next/link'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/button'

const Navigation = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      w="full"
      display={{ base: 'none', sm: 'flex' }}
      alignItems="center"
      paddingX={8}
      className="navigation"
    >
      <Heading size="xs">Melon Vanilla Sour</Heading>
      <Spacer />
      <Link href="/">
        <Heading size="xs" cursor="pointer">
          About Me
        </Heading>
      </Link>
      <Spacer />
      <Link href="/posts/1">
        <Heading size="xs" cursor="pointer">
          Posts
        </Heading>
      </Link>
      <Spacer />
      <Link href="/projects">
        <Heading size="xs" cursor="pointer">
          Projects
        </Heading>
      </Link>
      <Spacer />
      <IconButton aria-label="Toggle Mode" onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </Flex>
  )
}

export default Navigation
