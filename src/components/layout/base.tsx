import { Box, SlideFade, useColorModeValue, Flex } from '@chakra-ui/react'
import Head from 'next/head'

import MobileNavigation from '../MobileNavigation'
import Header from '../Header'
import TopButton from '../TopButton'

const Main = ({ children }) => {
  return (
    <>
      <Head>
        <title>Melon Sour</title>
        <meta name="author" content="Melon Sour" />
        <meta name="description" content="A blog about programming, games and tech" />
      </Head>
      <Flex
        paddingTop={4}
        paddingBottom={16}
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
      {/* <TopButton></TopButton> */}
      <MobileNavigation />
    </>
  )
}

export default Main
