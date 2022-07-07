import { Box, Button, Heading, HStack, Grid } from '@chakra-ui/react'
import { buildClient } from '../lib/contentful'
import Link from 'next/link'
import { capitalizeString } from '../lib/utils'

const client = buildClient()

const removeEmptyFields = (categories) => {
  return [...categories].filter((category) => category.fields != null)
}

// Since 'category' isn't a required field for post, some category entries don't have a 'fields' key
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
    content_type: 'post',
    order: '-sys.createdAt',
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
      <Heading my={8} size="lg">
        Categories
      </Heading>
      <Box mb={8}>
        <HStack justifyContent="center">
          <Button>Categories</Button>
          <Button>Tags</Button>
        </HStack>
      </Box>
      <Grid templateColumns={{ base: 'repeat(4, 1fr)', sm: 'repeat(6, 1fr)' }} gap={6}>
        {categories &&
          categories.map((category) => (
            <Link href={`/categories/${category}`}>
              <Button w={40}>{capitalizeString(category)}</Button>
            </Link>
          ))}
        <Link href="/posts/1">
          <Button w={40}>View all posts</Button>
        </Link>
      </Grid>
    </>
  )
}

export default Blog
