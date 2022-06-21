import { Box, SlideFade, useColorModeValue, Flex } from '@chakra-ui/react'
import Head from 'next/head'

import MobileNavigation from '../MobileNavigation'
import Navigation from '../Navigation'

const Main = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Melon Sour's homepage" />
        <meta name="author" content="Melon Sour" />
        <meta property="og:type" content="website" />
        <title>Melon Sour</title>
      </Head>
      <Flex
        paddingY={4}
        paddingX={4}
        minH="calc(100vh)"
        display="flex"
        flexDirection="column"
        borderRadius="md"
        maxWidth="960px"
        margin="0 auto"
      >
        <Navigation />
        {children}
      </Flex>
      <MobileNavigation />
    </>
  )
}

export default Main