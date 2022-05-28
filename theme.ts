import '@fontsource/rubik/800.css'

import { extendTheme, useColorModeValue } from '@chakra-ui/react'

const glass = {
  // bg: useColorModeValue('rgba( 255, 255, 255, 0.65 )', 'rgba( 255, 255, 255, 0.65 )'),
  bg: 'rgba( 255, 255, 255, 0.65 )',
  backdropFilter: 'blur( 10px )',
  border: '1px solid rgba( 255, 255, 255, 0.5 )',
}

// Theme Customization
const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        overscrollBehavior: 'none',
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
        solid: glass,
      },
    },
    Heading: {
      baseStyle: {
        textAlign: 'center',
      },
    },
    Text: {
      baseStyle: {
        marginY: '10px',
      },
    },
  },
})

export default theme
