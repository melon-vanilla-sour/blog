import '@fontsource-variable/open-sans'
import '@fontsource/merriweather'
import '@fontsource-variable/pixelify-sans'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Main from '../components/layout/base'

// google analytics
import { googleTagManagerId } from '../lib/utils'
import GoogleTagManager, { GoogleTagManagerId } from '../components/GoogleTagManager'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { GA_TRACKING_ID, pageview } from '../lib/gtag'

import theme from '../../theme'

import Head from 'next/head'

export default function MyApp({ Component, pageProps }) {
  // send new analytics on page change
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content="Melon Sour" key="ogTitle" />
        <meta property="og:url" content="https://www.melonsour.com" key="ogUrl" />
        <meta property="og:image" content="https://www.melonsour.com/ogp.png" key="ogImage" />
        <meta property="og:type" content="website" />
      </Head>
      {/* Load GA script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Main>
        {/* <GoogleTagManager googleTagManagerId={googleTagManagerId as GoogleTagManagerId} /> */}
        <Component {...pageProps} />
      </Main>
    </ChakraProvider>
  )
}
