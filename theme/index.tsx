import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const glass = {
  bg: 'rgba( 255, 255, 255, 0.1 )',
  backdropFilter: 'blur( 4px )',
  border: '1px solid rgba( 255, 255, 255, 0.3 )',
}

const iconGrid = {
  gap: 8,
  maxW: 'lg',
  padding: 8,
  borderRadius: 'lg',
  boxShadow: 'md',
}

const colors = {
  brand: {
    text: '#444444',
    primary: '',
    secondary: '#fff6e3',
  },
}

// Theme Customization
const overrides = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors: { ...colors },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('white', 'gray.800')(props),
        overflow: 'scroll',
        fontSize: 'md',
      },
      '.glass': {
        ...glass,
      },
      '.card': {
        paddingBottom: 2,
        boxShadow: 'md',
        transition: '0.2s ease-in-out',
        borderRadius: 'lg',
        overflow: 'hidden',
        w: 'full',
        boxSizing: 'content-box',
        bg: mode('white', 'gray.700')(props),
        _hover: {
          boxShadow: 'xs',
          opacity: '1',
          transition: '0.2s ease-in-out',
        },
      },
      '.iconGrid': {
        ...iconGrid,
        background: mode('white', 'gray.700')(props),
      },
    }),
  },
  fonts: {
    heading: 'Open Sans, sans-serif',
    body: 'Open Sans, sans-serif',
  },
  components: {
    Button: {
      baseStyle: { _focus: { boxShadow: 'none' } },
      variants: {
        solid: (props) => ({
          bg: mode('white', 'gray.700')(props),
          boxShadow: 'md',
        }),
      },
    },
    Heading: {
      baseStyle: () => ({
        textAlign: 'center',
        fontWeight: 'bolder',
      }),
    },
    Text: {
      baseStyle: () => ({}),
    },
  },
}

export default extendTheme(overrides)
