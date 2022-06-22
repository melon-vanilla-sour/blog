import Link from 'next/link'

import { Flex, Box, useColorMode, useColorModeValue } from '@chakra-ui/react'

const Pagination = ({ totalPages }) => {
  return (
    <Flex mt={8} justifyContent="center">
      {[...Array(totalPages)].map((page, index) => (
        <Box
          borderRadius="50%"
          backgroundColor={useColorModeValue('white', 'gray.700')}
          w="45px"
          h="45px"
          lineHeight="45px"
          textAlign="center"
          boxShadow="lg"
        >
          <Link href={`/posts/${index + 1}`}>{(index + 1).toString()}</Link>
        </Box>
      ))}
    </Flex>
  )
}

export default Pagination
