import '@fontsource/open-sans/400.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Main from '../components/layout/base'

import theme from '../../theme'

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Main>
        <Component {...pageProps} />
      </Main>
    </ChakraProvider>
  )
}
