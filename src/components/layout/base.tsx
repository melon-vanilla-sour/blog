import { Box, SlideFade, useColorModeValue, Flex } from '@chakra-ui/react'
import Head from 'next/head'

import MobileNavigation from '../MobileNavigation'
import Header from '../Header'
import TopButton from '../TopButton'

const Main = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A blog about programming, games and tech" />
        <meta name="author" content="Melon Sour" />
        <meta property="og:type" content="website" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <title>Melon Sour</title>
      </Head>
      <Flex
        paddingTop={4}
        paddingBottom={{ base: '4', sm: '4' }}
        paddingX={{ base: 4, sm: 4 }}
        minH="calc(100vh)"
        display="flex"
        flexDirection="column"
        borderRadius="md"
        maxWidth="900"
        margin="0 auto"
        overflow="hidden"
      >
        <Header />
        <SlideFade in={true} offsetY="20px">
          {children}
        </SlideFade>
      </Flex>
      <TopButton></TopButton>
      <MobileNavigation />
    </>
  )
}

export default Main
