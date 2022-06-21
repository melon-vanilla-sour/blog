import { Box, Button, Heading, HStack } from '@chakra-ui/react'
import { buildClient } from '../lib/contentful'
import Link from 'next/link'

import { Center, SimpleGrid, VStack, Text } from '@chakra-ui/react'

import Head from 'next/head'
import Card from '../components/Card'

const client = buildClient()

export const getStaticProps = async () => {
  const { items: categories } = await client.getEntries({
    content_type: 'post',
    order: '-sys.createdAt',
    select: 'fields.category',
  })
  // Since 'category' isn't a required field for post, some category entries don't have a 'fields' key
  categories.filter((category) => {
    category.fields != null
  })
  return {
    props: { categories: categories },
  }
}

function Blog({ categories }) {
  // Filter duplicates
  const nonDuplicateCategories = []
  categories.map((category) => {
    if (!nonDuplicateCategories.includes(category.fields.category)) {
      nonDuplicateCategories.push(category.fields.category)
    }
  })

  return (
    <>
      <Heading my={8}>Categories</Heading>
      <Box mb={8}>
        <HStack justifyContent="center">
          <Button>Categories</Button>
          <Button>Tags</Button>
        </HStack>
      </Box>
      <VStack alignItems="start">
        {nonDuplicateCategories &&
          nonDuplicateCategories.map((category) => (
            <Link href={`/categories/${category}`}>{category}</Link>
          ))}
      </VStack>
    </>
  )
}

export default Blog
