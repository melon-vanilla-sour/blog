import { ChakraProvider, extendTheme } from '@chakra-ui/react'

// Theme Customization
const theme = extendTheme({
  components: {
    Heading: {
      baseStyle: {
        marginTop: '15px',
        marginBottom: '15px',
        // textDecoration: 'underline',
        // textUnderlineOffset: '5px',
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
