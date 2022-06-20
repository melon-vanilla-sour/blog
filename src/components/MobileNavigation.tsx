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
      paddingX={4}
      position="fixed"
      bottom="0"
      background="white"
      alignItems="center"
      boxShadow="md"
    >
      <Link href="/">
        <Text cursor="pointer" fontWeight="semibold">
          About
        </Text>
      </Link>
      <Spacer />
      <Link href="/posts/1">
        <Text cursor="pointer" fontWeight="semibold">
          Posts
        </Text>
      </Link>
      <Spacer />
      <Link href="/projects">
        <Text cursor="pointer" fontWeight="semibold">
          Projects
        </Text>
      </Link>
      <Spacer />
      <IconButton aria-label="Toggle Mode" onClick={toggleColorMode} boxShadow="none">
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </Flex>
  )
}

export default MobileNavigation
