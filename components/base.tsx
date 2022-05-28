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
      <Box
        id="test"
        position={'absolute'}
        clipPath={'url(#curvedGradient)'}
        backgroundImage={useColorModeValue(
          'linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)',
          'linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)'
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
              stroke-linecap="round"
              stroke-linejoin="miter"
            ></path>
          </clipPath>
        </svg>
      </Box>
      <Navigation />
      <Center flex="1">
        <Box
          // boxShadow="24px 24px 48px #d1d1d1, -24px -24px 48px #ffffff"
          boxShadow="md"
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
          // background={useColorModeValue('white', 'gray.800')}
          borderRadius="md"
          background={useColorModeValue(
            'rgba( 255, 255, 255, 0.65 )',
            'rgba( 255, 255, 255, 0.05 )'
          )}
          backdropFilter={'blur( 10px )'}
          border="1px solid rgba( 255, 255, 255, 0.5 )"
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
