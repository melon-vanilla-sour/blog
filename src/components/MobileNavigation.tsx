import { HamburgerIcon, SunIcon, MoonIcon, CloseIcon } from '@chakra-ui/icons'
import {
  Text,
  Flex,
  IconButton,
  useColorMode,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  useDisclosure,
  Center,
  Box,
} from '@chakra-ui/react'
import Link from 'next/link'

const MobileNavigation = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInRight">
        <ModalOverlay />
        <ModalContent
          bg={useColorModeValue('white', 'blackAlpha.800')}
          position="fixed"
          right="0px"
          marginTop="0px"
          height="100%"
          width="60%"
          borderRadius="0"
        >
          <ModalHeader mx="auto">Go to Page</ModalHeader>
          <Box flexGrow={1}></Box>
          <Center>
            <IconButton
              aria-label="Toggle Mode"
              onClick={toggleColorMode}
              boxShadow="none"
              my={2}
              bg={useColorModeValue('', '')}
            >
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </Center>
          <Flex flexDir="column" alignItems="center" onClick={onClose} my={2}>
            <Box my={4}>
              <Link href="/">
                <Text cursor="pointer">About</Text>
              </Link>
            </Box>
            <Box my={4}>
              <Link href="/posts/1">
                <Text cursor="pointer">Posts</Text>
              </Link>
            </Box>
            <Box my={4}>
              <Link href="/projects">
                <Text cursor="pointer">Projects</Text>
              </Link>
            </Box>
          </Flex>
          <IconButton
            aria-label="Close Navigation"
            boxShadow="none"
            py={2}
            onClick={onClose}
            bg={useColorModeValue('', '')}
            borderRadius="0"
          >
            <CloseIcon></CloseIcon>
          </IconButton>
        </ModalContent>
      </Modal>
      <IconButton
        aria-label="Toggle Navigation"
        onClick={onOpen}
        position="fixed"
        bottom={4}
        right={4}
        display={{ base: 'block', sm: 'none' }}
        bg={useColorModeValue('whiteAlpha.800', 'blackAlpha.800')}
        border="1px solid"
        borderColor={useColorModeValue('blackAlpha.400', 'whiteAlpha.300')}
      >
        <HamburgerIcon />
      </IconButton>
    </Box>
  )
}

export default MobileNavigation
