import {
  Center,
  Heading,
  Box,
  VStack,
  Text,
  Flex,
  HStack,
  SlideFade,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'

import MobileNavigation from './MobileNavigation'
import Navigation from './Navigation'

const Base = ({ children }) => {
  return (
    <Box>
      <Navigation />
      <Center flex="1">
        <Box
          // boxShadow="24px 24px 48px #d1d1d1, -24px -24px 48px #ffffff"
          boxShadow="2xl"
          paddingY={'60px'}
          mt="6"
          mb="6"
          px={2}
          rounded="md"
          width={['100%', '100%', '70%']}
          minH="calc(100vh)"
          display="flex"
          flexDirection="column"
          alignItems="center"
          background={useColorModeValue('white', 'gray.800')}
          borderRadius="md"
        >
          <SlideFade in={true}>
            <Box>{children}</Box>
          </SlideFade>
        </Box>
      </Center>
      <MobileNavigation></MobileNavigation>
    </Box>
  )
}

export default Base
