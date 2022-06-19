import { Box, Button, Heading, HStack } from '@chakra-ui/react'
import { buildClient } from '../lib/contentful'
import Link from 'next/link'

import { Center, SimpleGrid, VStack, Text } from '@chakra-ui/react'

import Base from '../components/layout/base'
import Head from 'next/head'
import Card from '../components/Card'

// const client = buildClient()

// export const getStaticProps = async () => {
//   const { items } = await client.getEntries({
//     content_type: 'post',
//     order: '-sys.createdAt',
//     select: 'fields.tags',
//   })
//   return {
//     props: { categories: items },
//   }
// }

function Tags({ categories }) {
  //   const filteredTags = []
  //   const filterCategories = (() => {
  //     // Since 'category' isn't a required field for post, some category entries don't have a 'fields' key
  //     categories.filter((category) => {
  //       category.fields != null
  //     })

  //     // Filter duplicates
  //     categories.map((category) => {
  //       if (!filteredTags.includes(category.fields.tags)) {
  //         filteredTags.push(category.fields.tags)
  //       }
  //     })
  //   })()

  return (
    <>
      {/* <Heading mb="40px">Tags</Heading>
      <Box mb={4}>
        <HStack justifyContent="center">
          <Button>Categories</Button>
          <Button>Tags</Button>
        </HStack>
      </Box>
      <VStack alignItems="start">
        {filteredTags && filteredTags.map((tag) => <Text>{tag}</Text>)}
      </VStack> */}
    </>
  )
}

export default Tags
