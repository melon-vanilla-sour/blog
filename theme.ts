import '@fontsource/rubik/800.css'

import { extendTheme, useColorModeValue } from '@chakra-ui/react'

const glass = {
  // bg: useColorModeValue('rgba( 255, 255, 255, 0.65 )', 'rgba( 255, 255, 255, 0.65 )'),
  bg: 'rgba( 255, 255, 255, 0.1 )',
  backdropFilter: 'blur( 4px )',
  border: '1px solid rgba( 255, 255, 255, 0.3 )',
}

// Theme Customization
const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        overscrollBehavior: 'none',
      },
      '.glass': {
        ...glass,
      },
    },
  },
  fonts: {
    heading: 'rubik, sans-serif',
  },
  initialColorMode: 'light',
  useSystemColorMode: false,
  components: {
    Button: {
      baseStyle: { _focus: { boxShadow: 'none' } },
      variants: {
        solid: (props) => ({
          ...glass,
          _hover: { bg: props.colorMode === 'dark' ? 'gray.500' : 'gray.300' },
        }),
      },
    },
    Heading: {
      baseStyle: (props) => ({
        textAlign: 'center',
      }),
    },
    Text: {
      baseStyle: (props) => ({
        marginY: '10px',
      }),
    },
  },
})

export default theme
