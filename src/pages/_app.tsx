import '@fontsource-variable/open-sans'
import '@fontsource/merriweather'
import '@fontsource-variable/pixelify-sans'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Main from '../components/layout/base'
import { googleTagManagerId } from '../lib/utils'
import GoogleTagManager, { GoogleTagManagerId } from '../components/GoogleTagManager'

import theme from '../../theme'

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Main>
        <GoogleTagManager googleTagManagerId={googleTagManagerId as GoogleTagManagerId} />
        <Component {...pageProps} />
      </Main>
    </ChakraProvider>
  )
}
