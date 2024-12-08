import '@fontsource-variable/open-sans'
import '@fontsource/merriweather'
import '@fontsource-variable/pixelify-sans'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Main from '../components/layout/base'
import { googleTagManagerId } from '../lib/utils'
import GoogleTagManager, { GoogleTagManagerId } from '../components/GoogleTagManager'

import theme from '../../theme'

import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content="Melon Sour" key="ogTitle" />
        <meta property="og:url" content="https://www.melonsour.com" key="ogUrl" />
        <meta property="og:image" content="https://www.melonsour.com/ogp.png" key="ogImage" />
        <meta property="og:type" content="website" />
      </Head>
      <Main>
        <GoogleTagManager googleTagManagerId={googleTagManagerId as GoogleTagManagerId} />
        <Component {...pageProps} />
      </Main>
    </ChakraProvider>
  )
}
