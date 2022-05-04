import { Box, Button, Heading, HStack } from '@chakra-ui/react'
import { buildClient } from '../lib/contentful'
import Link from 'next/link'

import { Center, SimpleGrid, VStack, Text } from '@chakra-ui/react'

import Base from '../../components/base'
import Head from 'next/head'
import PostThumbnail from '../../components/postThumbnail'

const client = buildClient()

export const getStaticProps = async () => {
  const { items } = await client.getEntries({
    content_type: 'post',
    order: '-sys.createdAt',
    select: 'fields.category',
  })
  return {
    props: { categories: items },
  }
}

function Blog({ categories }) {
  // Since 'category' isn't a required field for post, some category entries don't have a 'fields' key
  categories.filter((category) => {
    category.fields != null
  })

  // Filter duplicates
  const filteredCategories = []
  categories.map((category) => {
    if (!filteredCategories.includes(category.fields.category)) {
      filteredCategories.push(category.fields.category)
    }
  })

  return (
    <Base>
      <Heading mb="40px">Categories</Heading>
      <Box mb={4}>
        <HStack justifyContent="center">
          <Button>Categories</Button>
          <Button>Tags</Button>
        </HStack>
      </Box>
      <VStack alignItems="start">
        {filteredCategories && filteredCategories.map((category) => <Text>{category}</Text>)}
      </VStack>
    </Base>
  )
}

export default Blog
