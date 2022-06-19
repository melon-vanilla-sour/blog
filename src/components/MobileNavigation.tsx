import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Spacer,
  Heading,
  Text,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'

const MobileNavigation = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex
      w="full"
      display={{ base: 'flex', md: 'none' }}
      alignItems="center"
      paddingX={8}
      position="fixed"
      bottom={2}
    >
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
      <IconButton aria-label="Toggle Mode" onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </Flex>
  )
}

export default MobileNavigation
