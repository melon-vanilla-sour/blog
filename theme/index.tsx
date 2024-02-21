import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

// Theme Customization
const overrides = {
  initialColorMode: 'light',
  useSystemColorMode: false,
  colors: {
    brand: {
      text: '#444444',
      primary: '',
      secondary: '#fff6e3',
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('white', 'blackAlpha.900')(props),
        overflow: 'scroll',
        fontSize: 'md',
      },
      code: {
        fontSize: 'sm',
      },
      '.glass': {
        bg: 'rgba( 255, 255, 255, 0.1 )',
        backdropFilter: 'blur( 4px )',
        border: '1px solid rgba( 255, 255, 255, 0.3 )',
      },
      '.card': {
        boxShadow: 'md',
        transition: '0.1s ease-in-out',
        borderRadius: 'lg',
        border: '1px solid',
        borderColor: mode('blackAlpha.400', 'whiteAlpha.400')(props),
        overflow: 'hidden',
        boxSizing: 'content-box',
        bg: mode('white', 'whiteAlpha.50')(props),
        _hover: {
          boxShadow: 'xs',
          opacity: '1',
          borderColor: mode('blackAlpha.400', 'whiteAlpha.600')(props),
          transition: '0.2s ease-in-out',
        },
        cursor: 'pointer',
      },
      '.cardDate': {
        caretColor: 'transparent',
      },
      '.iconGrid': {
        gap: 8,
        maxW: 'lg',
        padding: 8,
        borderRadius: 'lg',
        boxShadow: 'md',
        background: mode('white', 'whiteAlpha.200')(props),
      },
      '.code-block': {
        borderRadius: 10,
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
          bg: mode('white', 'whiteAlpha.200')(props),
          boxShadow: 'md',
        }),
      },
    },
    Heading: {
      baseStyle: () => ({
        textAlign: 'center',
        fontWeight: 'bolder',
        caretColor: 'transparent',
      }),
    },
    Text: {
      baseStyle: (props) => ({
        lineHeight: '1.8',
        // wordSpacing: '0.08rem',
        color: mode('gray.800', 'gray.200')(props)
      }),
    },
  },
}

export default extendTheme(overrides)
