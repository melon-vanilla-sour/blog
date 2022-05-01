import { Center, Heading, Box, VStack, Text, Flex, HStack, SlideFade } from '@chakra-ui/react'
import Link from 'next/link'

import MobileNavigation from './MobileNavigation'
import Navigation from './Navigation'

const Base = ({ children }) => {
  return (
    <Box>
      <Navigation />
      <Center flex="1">
        <Box
          boxShadow="24px 24px 48px #d1d1d1, -24px -24px 48px #ffffff"
          paddingTop="60px"
          paddingBottom="60px"
          mt="6"
          mb="6"
          rounded="md"
          width={['100%', '100%', '70%']}
          minH="calc(100vh)"
          display="flex"
          flexDirection="column"
          alignItems="center"
          background="white"
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
