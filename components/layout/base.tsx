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
import Head from 'next/head'

import MobileNavigation from '../MobileNavigation'
import Navigation from '../Navigation'

const Base = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Melon Sour's homepage" />
        <meta name="author" content="Melon Sour" />
        <meta property="og:type" content="website" />
        <title>Melon Sour</title>
      </Head>
      <Box
        id="test"
        position={'absolute'}
        clipPath={'url(#curvedGradient)'}
        backgroundImage={useColorModeValue(
          'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
          'linear-gradient(135deg, #5eb0e4 0%, #6f76d8 100%)'
        )}
        width="100%"
        h="100%"
        zIndex={'-1'}
      ></Box>
      <Box position={'absolute'} id="clip">
        <svg id="visual" viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <clipPath id="curvedGradient">
            <path
              transform="scale(2,2)"
              d="M0 244L53.3 215.2C106.7 186.3 213.3 128.7 320 114.3C426.7 100 533.3 129 640 131.7C746.7 134.3 853.3 110.7 906.7 98.8L960 87L960 0L906.7 0C853.3 0 746.7 0 640 0C533.3 0 426.7 0 320 0C213.3 0 106.7 0 53.3 0L0 0Z"
              fill="#000000"
              strokeLinecap="round"
              strokeLinejoin="miter"
            ></path>
          </clipPath>
        </svg>
      </Box>
      {/* <Navigation /> */}
      <Box
        paddingY={'60px'}
        paddingX={4}
        minH="calc(100vh)"
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius="md"
      >
        {/* <SlideFade in={true}>{children}</SlideFade> */}
        {children}
      </Box>
      <MobileNavigation></MobileNavigation>
    </>
  )
}

export default Base
