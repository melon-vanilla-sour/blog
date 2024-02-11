import { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../../theme'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content="Melon Sour" />
        <meta property="og:url" content="https://www.melonsour.com" />
        <meta property="og:image" content="/melon-sour.ico" />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
