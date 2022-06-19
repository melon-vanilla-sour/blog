import Link from 'next/link'

import { Flex } from '@chakra-ui/react'

const Pagination = ({ totalPages }) => {
  return (
    <Flex mt={8} justifyContent="center">
      {[...Array(totalPages)].map((page, index) => (
        <Link href={`/posts/${index + 1}`}>{(index + 1).toString()}</Link>
      ))}
    </Flex>
  )
}

export default Pagination
