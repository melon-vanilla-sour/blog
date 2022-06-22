import { Heading, Flex, Spacer } from '@chakra-ui/react'
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
      <Heading size="sm">Melon Vanilla Sour</Heading>
      <Spacer />
      <Link href="/">
        <Heading size="sm" cursor="pointer">
          About
        </Heading>
      </Link>
      <Spacer />
      <Link href="/posts/1">
        <Heading size="sm" cursor="pointer">
          Posts
        </Heading>
      </Link>
      <Spacer />
      <Link href="/projects">
        <Heading size="sm" cursor="pointer">
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
