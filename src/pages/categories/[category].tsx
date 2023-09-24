import { buildClient, postsPerPage } from '../../lib/contentful'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'
import { Heading, Button, Grid, GridItem } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { capitalizeString, getImageUrls } from '../../lib/utils'
import { getPlaiceholder } from 'plaiceholder'

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
    content_type: 'markdownPost',
    order: '-fields.created',
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
    content_type: 'markdownPost',
    order: '-fields.created',
    'fields.category[in]': params.category,
  })

  const placeholders = []
  await Promise.all(
    posts.map(async (item, index) => {
      // @ts-ignore
      const imageUrls = getImageUrls(item.fields.body)
      if (!imageUrls) return
      const { base64, img } = await getPlaiceholder(`https:${imageUrls[0]}`)
      placeholders[index] = { ...img, blurDataURL: base64 }
    })
  )
  return {
    props: {
      category: params.category,
      posts: posts,
      placeholders: placeholders,
    },
  }
}

function Category({ category, posts, placeholders }) {
  return (
    <>
      <Heading my={8}>{capitalizeString(category)}</Heading>
      <Grid templateColumns="repeat(1, 1fr)" gap={6}>
        {posts &&
          posts.map((post, index) => (
            <GridItem key={post.sys.id}>
              <Card post={post} index={index} thumbnail={placeholders[index]}></Card>
            </GridItem>
          ))}
        <Link href="/posts/1">
          <Button w={40}>View all posts</Button>
        </Link>
      </Grid>
      {/* <Pagination></Pagination> */}
    </>
  )
}

export default Category
