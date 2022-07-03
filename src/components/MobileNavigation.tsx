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
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent position="fixed" right="0px" marginTop="0px" height="100%" width="80%">
          <ModalHeader>Go to Page</ModalHeader>
          <Box flexGrow={1}></Box>
          <Center>
            <IconButton aria-label="Toggle Mode" onClick={toggleColorMode} boxShadow="none" my={2}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </Center>
          <Flex flexDir="column" alignItems="center" onClick={onClose} my={2}>
            <Box my={2}>
              <Link href="/">
                <Text cursor="pointer" fontWeight="semibold">
                  About
                </Text>
              </Link>
            </Box>
            <Box my={2}>
              <Link href="/posts/1">
                <Text cursor="pointer" fontWeight="semibold">
                  Posts
                </Text>
              </Link>
            </Box>
            <Box my={2}>
              <Link href="/projects">
                <Text cursor="pointer" fontWeight="semibold">
                  Projects
                </Text>
              </Link>
            </Box>
          </Flex>
          <IconButton aria-label="Close Navigation" boxShadow="none" my={2} onClick={onClose}>
            <CloseIcon></CloseIcon>
          </IconButton>
        </ModalContent>
      </Modal>
      <IconButton
        aria-label="Toggle Navigation"
        onClick={onOpen}
        position="fixed"
        bottom="50px"
        right="20px"
        display={{ base: 'block', sm: 'none' }}
      >
        <HamburgerIcon />
      </IconButton>
    </>
  )
}

export default MobileNavigation
