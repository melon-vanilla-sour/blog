import '@fontsource/rubik/800.css'

import { extendTheme } from '@chakra-ui/react'

// Theme Customization
const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        overscrollBehaviorY: 'none',
      },
    },
  },
  fonts: {
    heading: 'rubik, sans-serif',
  },
  initialColorMode: 'light',
  useSystemColorMode: false,
  components: {
    Button: { baseStyle: { _focus: { boxShadow: 'none' } } },
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
