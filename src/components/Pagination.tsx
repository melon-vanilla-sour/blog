import Link from 'next/link'

import { Flex, Box, useColorModeValue } from '@chakra-ui/react'

const Pagination = ({ totalPages, currentPage }: { totalPages: number; currentPage: number }) => {
  return (
    <Flex mt={8} justifyContent="center">
      {[...Array(totalPages)].map((page, index) => (
        <Link href={`/posts/${index + 1}`} key={index}>
          <a>
            <Box
              borderRadius="50%"
              backgroundColor={useColorModeValue('white', 'whiteAlpha.200')}
              w="45px"
              h="45px"
              lineHeight="45px"
              textAlign="center"
              boxShadow="lg"
              key={index}
              mx={2}
              style={{ caretColor: 'transparent' }}
              border="1px solid"
              borderColor={
                index + 1 == currentPage
                  ? useColorModeValue('blackAlpha.400', 'whiteAlpha.600')
                  : 'transparent'
              }
              _hover={{
                boxShadow: 'xs',
                opacity: '1',
                borderColor: useColorModeValue('blackAlpha.400', 'whiteAlpha.600'),
                transition: '0.2s ease-in-out',
              }}
              cursor="pointer"
              className="tab-focus-outline"
            >
              {(index + 1).toString()}
            </Box>
          </a>
        </Link>
      ))}
    </Flex>
  )
}

export default Pagination
