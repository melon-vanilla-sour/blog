import { buildClient } from '../../lib/contentful'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'
import { Heading, Button, Grid, GridItem } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { capitalizeString } from '../../lib/utils'

const client = buildClient()
// const router = useRouter()
// const { pid } = router.query

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

export const getStaticPaths = async () => {
  const { items: categories } = await client.getEntries({
    content_type: 'post',
    order: '-sys.createdAt',
    select: 'fields.category',
  })
  const nonEmptyCategories = removeEmptyFields(categories)
  const uniqueNonEmptyCategories = removeDuplicates(nonEmptyCategories)
  const paths = []
  uniqueNonEmptyCategories.map((category) => {
    paths.push({ params: { category: category } })
  })
  return {
    paths,
    fallback: false,
  }
}
export const getStaticProps = async ({ params }) => {
  const { items: posts } = await client.getEntries({
    content_type: 'post',
    order: '-sys.createdAt',
    'fields.category[in]': params.category,
  })
  return {
    props: {
      category: params.category,
      posts: posts,
    },
  }
}

function Category({ category, posts }) {
  return (
    <>
      <Heading my={8}>{capitalizeString(category)}</Heading>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} gap={6}>
        {posts &&
          posts.map((post, index) => (
            <GridItem>
              <Card post={post} index={index} key={post.sys.id}></Card>
            </GridItem>
          ))}
        <Link href="/posts/1">
          <Button w={40}>View all posts</Button>
        </Link>
      </Grid>
      <Pagination></Pagination>
    </>
  )
}

export default Category
