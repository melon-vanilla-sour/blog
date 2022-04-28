import { Center, Heading, Box } from '@chakra-ui/react'

const Base = ({ children }) => {
  return (
    <Center>
      <Box
        boxShadow="24px 24px 48px #d1d1d1, -24px -24px 48px #ffffff"
        p="6"
        mt="6"
        mb="6"
        rounded="md"
        width="66%"
        minH="calc(100vh)"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading textDecoration="underline" textUnderlineOffset="5px">
          Melon Vanilla Sour
        </Heading>
        <>{children}</>
      </Box>
    </Center>
  )
}

export default Base
