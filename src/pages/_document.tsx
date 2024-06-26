import { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'
import theme from '../../theme'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content="Melon Sour" />
        <meta property="og:url" content="https://www.melonsour.com" />
        <meta property="og:image" content="https://www.melonsour.com/ogp.png" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
