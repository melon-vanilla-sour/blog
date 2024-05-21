import { Heading, Button, Grid, GridItem, HStack } from '@chakra-ui/react'
import Link from 'next/link'
import matter from 'gray-matter'

import { filterDraftPosts } from '../../lib/utils'
import { getCachedContent } from '../../lib/remoteMd'

import Card from '../../components/Card'
import Pagination from '../../components/Pagination'

export const getStaticPaths = async () => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)

  const categories = []
  markdownContent.map((post) => {
    const {
      data: { category = '' },
    } = matter(post.value)
    if (category && !categories.includes(category)) {
      categories.push(category)
    }
  })

  const paths = []
  categories.map((category) => {
    paths.push({ params: { category: category } })
  })
  return {
    paths,
    fallback: false,
  }
}
export const getStaticProps = async ({ params }) => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)

  markdownContent = markdownContent.filter((post) => {
    const {
      data: { category = '' },
    } = matter(post.value)
    return category == params.category
  })

  return {
    props: {
      category: params.category,
      posts: markdownContent,
    },
  }
}

function Category({ category, posts, placeholders }) {
  return (
    <>
      {/* <Heading size='lg' my={6}>{capitalizeString(category)}</Heading> */}
      <Grid templateColumns="repeat(1, 1fr)" gap={{ base: '3', sm: '4' }} my={4}>
        {posts && posts.map((post, index) => <Card post={post.value} key={post.value}></Card>)}
        <HStack>
          <Link href="/posts/1">
            <Button w={40}>View all posts</Button>
          </Link>
          <Link href="/categories">
            <Button w={40}>View Categories</Button>
          </Link>
        </HStack>
      </Grid>
      {/* <Pagination></Pagination> */}
    </>
  )
}

export default Category
