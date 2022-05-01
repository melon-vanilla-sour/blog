import '@fontsource/rubik/800.css'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import theme from '../../theme'

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
