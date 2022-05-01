import '@fontsource/rubik/800.css'

import { extendTheme } from '@chakra-ui/react'

// Theme Customization
const theme = extendTheme({
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
  },
})

export default theme
