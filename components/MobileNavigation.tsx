import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Center,
  Heading,
  Box,
  VStack,
  Text,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'

const MobileNavigation = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <HStack
      w="100%"
      position="fixed"
      bottom="0px"
      display={['flex', 'flex', 'none']}
      // boxShadow="2xl"
      justify="space-around"
      background={useColorModeValue('white', 'gray.800')}
      // className="glass"
      borderTop="1px solid rgba( 255, 255, 255, 0.3 )"
    >
      <Link href="/">
        <Text cursor="pointer" w={'100%'} textAlign="center">
          About Me
        </Text>
      </Link>
      <Link href="/posts">
        <Text cursor="pointer" w={'100%'} textAlign="center">
          Posts
        </Text>
      </Link>
      <Link href="/projects">
        <Text cursor="pointer" w={'100%'} textAlign="center">
          Projects
        </Text>
      </Link>
      <IconButton aria-label="Toggle Mode" onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </HStack>
  )
}

export default MobileNavigation
