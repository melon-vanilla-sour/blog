import { Box, Button, Heading, HStack, Grid, useColorModeValue } from '@chakra-ui/react'
import { buildClient } from '../lib/contentful'
import Link from 'next/link'
import { capitalizeString } from '../lib/utils'

const client = buildClient()

// Since 'category' isn't a required field for post, some category entries don't have a 'fields' key
const removeEmptyFields = (categories) => {
  return [...categories].filter((category) => category.fields != null)
}

const removeDuplicates = (categories) => {
  const array = []
  categories.map((category) => {
    if (!array.includes(category.fields.category)) {
      array.push(category.fields.category)
    }
  })
  return array
}

export const getStaticProps = async () => {
  const { items: categories } = await client.getEntries({
    content_type: 'markdownPost',
    order: 'fields.created',
    select: 'fields.category',
  })
  const nonEmptyCategories = removeEmptyFields(categories)
  const uniqueNonEmptyCategories = removeDuplicates(nonEmptyCategories)
  return {
    props: { categories: uniqueNonEmptyCategories },
  }
}

function Blog({ categories }) {
  return (
    <>
      <Box my={8}>
        <HStack justifyContent="center">
          <Button bg={useColorModeValue('gray.300', 'whiteAlpha.200')}>Categories</Button>
          <Button isDisabled={true}>Tags</Button>
          <Button isDisabled={true}>Archives</Button>
        </HStack>
      </Box>
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}
        gap={6}
        mb={6}
      >
        {categories &&
          categories.map((category) => (
            <Link href={`/categories/${category}`}>
              <Button w="100%">{capitalizeString(category)}</Button>
            </Link>
          ))}
      </Grid>
      <Link href="/posts/1">
        <Button w={40}>View all posts</Button>
      </Link>
    </>
  )
}

export default Blog
