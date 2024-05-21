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
          {/* <ModalHeader mx="auto">Go to Page</ModalHeader> */}
          <Box flexGrow={1}></Box>
          <Center>
            <IconButton
              aria-label="Toggle Mode"
              onClick={toggleColorMode}
              boxShadow="none"
              my={4}
              bg={useColorModeValue('', '')}
              w="full"
              // remove gray outline on hover and after clicking
              _hover={{}}
              _active={{}}
              // remove highlight on button when clicking on ios
              style={{ WebkitTapHighlightColor: 'rgba(0,0,0,0)' }}
            >
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </IconButton>
          </Center>
          <Flex flexDir="column" alignItems="center" onClick={onClose}>
            <Link href="/about">
              <Box py={6} cursor="pointer" w="full" h="full" textAlign="center">
                <Text fontSize="lg" fontWeight="semibold">
                  About
                </Text>
              </Box>
            </Link>
            <Link href="/posts/1">
              <Box py={6} cursor="pointer" w="full" h="full" textAlign="center">
                <Text fontSize="lg" fontWeight="semibold">
                  Posts
                </Text>
              </Box>
            </Link>
            <Link href="/projects">
              <Box py={6} cursor="pointer" w="full" h="full" textAlign="center">
                <Text fontSize="lg" fontWeight="semibold">
                  Projects
                </Text>
              </Box>
            </Link>
          </Flex>
          <IconButton
            aria-label="Close Navigation"
            boxShadow="none"
            my={4}
            onClick={onClose}
            bg={useColorModeValue('', '')}
            borderRadius="0"
            // remove gray outline on hover and after clicking
            _hover={{}}
            _active={{}}
            // remove highlight on button when clicking on ios
            style={{ WebkitTapHighlightColor: 'rgba(0,0,0,0)' }}
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
        w={14}
        h={14}
        display={{ base: 'block', sm: 'none' }}
        bg={useColorModeValue('white', 'blackAlpha.800')}
        border="1px solid"
        borderColor={useColorModeValue('blackAlpha.400', 'whiteAlpha.300')}
        borderRadius="50%"
      >
        <HamburgerIcon color={useColorModeValue('black', 'white')} />
      </IconButton>
    </Box>
  )
}

export default MobileNavigation
