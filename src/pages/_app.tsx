import { ChakraProvider, extendTheme } from '@chakra-ui/react'

// Theme Customization
const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        textAlign: 'center',
      },
    },
  },
})

export default function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
