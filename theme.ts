import '@fontsource/rubik/800.css'

import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const glass = {
  // bg: useColorModeValue('rgba( 255, 255, 255, 0.65 )', 'rgba( 255, 255, 255, 0.65 )'),
  bg: 'rgba( 255, 255, 255, 0.1 )',
  backdropFilter: 'blur( 4px )',
  border: '1px solid rgba( 255, 255, 255, 0.3 )',
}

// Theme Customization
const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: false,
  styles: {
    global: (props) => ({
      body: {
        bg: mode('blue.200', 'gray.900')(props),
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
          ...glass,
          // [`@media hover and _hover`]: {
          //   bg: props.colorMode === 'dark' ? 'red.500' : 'red.600',
          // },
          _hover: {
            bg: mode('blue.300', 'gray.600')(props),
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
      baseStyle: () => ({
        marginY: '10px',
      }),
    },
  },
})

export default theme
