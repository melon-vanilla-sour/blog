import '@fontsource/rubik/800.css'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import theme from '../../theme'
import Script from 'next/script'

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      {/* Remove overscrolling behavior for Safari */}
      <Script id="safari-overscroll-none">
        {`document.addEventListener('touchmove', function(event){
              event.preventDefault();
            }, { passive: false });
          `}
      </Script>
    </ChakraProvider>
  )
}
