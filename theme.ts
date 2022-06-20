import '@fontsource/rubik/800.css'

import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const glass = {
  bg: 'rgba( 255, 255, 255, 0.1 )',
  backdropFilter: 'blur( 4px )',
  border: '1px solid rgba( 255, 255, 255, 0.3 )',
}

const colors = {
  brand: {
    primary: '',
    secondary: '#fff6e3',
  },
}

// Theme Customization
const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors: { ...colors },
  styles: {
    global: (props) => ({
      body: {
        bg: mode(colors.brand.secondary, 'gray.800')(props),
      },
      '.glass': {
        ...glass,
      },
    }),
  },
  fonts: {
    heading: 'rubik, sans-serif',
  },
  components: {
    Button: {
      baseStyle: { _focus: { boxShadow: 'none' } },
      variants: {
        solid: (props) => ({
          bg: mode('white', 'gray.700')(props),
          boxShadow: 'md',
          _hover: {
            bg: mode('orange.200', 'green.500')(props),
          },
        }),
      },
    },
    Heading: {
      baseStyle: () => ({
        textAlign: 'center',
      }),
    },
    Text: {
      baseStyle: () => ({}),
    },
  },
})

export default theme
