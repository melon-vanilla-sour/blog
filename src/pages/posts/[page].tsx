import { Box, Button, HStack, Grid, Flex } from '@chakra-ui/react'
import Link from 'next/link'

import { postsPerPage } from '../../lib/contentful'
import { filterDraftPosts, reorderByDate } from '../../lib/utils'
import { getCachedContent } from '../../lib/remoteMd'

import Pagination from '../../components/Pagination'
import Card from '../../components/Card'

export const getStaticPaths = async () => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)
  const total = markdownContent.length
  const totalPages = Math.ceil(total / postsPerPage)
  const paths = []
  for (let page = 1; page <= totalPages; page++) {
    paths.push({ params: { page: page.toString() } })
  }

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: { params: { page: number } }) => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)
  markdownContent = reorderByDate(markdownContent)
  const upperBound = params.page * postsPerPage
  const lowerBound = upperBound - postsPerPage
  const targetPosts = markdownContent.slice(lowerBound, upperBound)
  const total = markdownContent.length
  const totalPages = Math.ceil(total / postsPerPage)
  const currentPage = params.page

  return {
    props: {
      posts: targetPosts,
      totalPages,
      currentPage,
    },
  }
}
function Posts({
  posts,
  totalPages,
  currentPage,
}: {
  posts
  totalPages: number
  currentPage: number
}) {
  return (
    <>
      <Box my={4}>
        <Flex w="full" justify="space-between" gap={2}>
          <Link href="/categories">
            <Button width="full">Categories</Button>
          </Link>
          <Link href="/tags">
            <Button w="full">Tags</Button>
          </Link>
          {/* <Button width="full" isDisabled={true}>
            Recommended
          </Button> */}
          <Button w="full" isDisabled={true}>
            Archives
          </Button>
        </Flex>
      </Box>
      <Grid templateColumns="repeat(1, 1fr)" gap={{ base: '3', sm: '4' }} my={4}>
        {posts &&
          posts.map((post, index) => {
            return <Card post={post.value} key={post.value}></Card>
          })}
      </Grid>
      <Pagination totalPages={totalPages} currentPage={currentPage}></Pagination>
    </>
  )
}

export default Posts
