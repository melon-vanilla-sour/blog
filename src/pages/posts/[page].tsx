import { Box, Button, Heading, HStack, Grid, GridItem } from '@chakra-ui/react'
import { postsPerPage } from '../../lib/contentful'

import Card from '../../components/Card'
import Pagination from '../../components/Pagination'
import { filterDraftPosts, getImageUrls, getSlugFromTitle } from '../../lib/utils'
import { fetchMarkdownFiles, fetchMarkdownContent, getCachedContent } from '../../lib/remoteMd'

import { getPlaiceholder } from 'plaiceholder'
import { MDXRemote } from 'next-mdx-remote'
import matter from 'gray-matter'

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
      currentPage
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
      {/* <Box my={8}>
      <HStack justifyContent="center">
          <Link href="/categories">
            <Button isDisabled={true}>Categories</Button>
          </Link>
          <Button isDisabled={true}>Tags</Button>
          <Button isDisabled={true}>Archives</Button>
        </HStack>
      </Box> */}
      <Grid templateColumns="repeat(1, 1fr)" gap={{ base: '3', sm: '4' }} my={8}>
        {posts &&
          posts.map((post, index) => {
            return (
              <Card post={post.value} key={post.value}></Card>
            )
          })
        }
      </Grid>
      <Pagination totalPages={totalPages} currentPage={currentPage}></Pagination>
    </>
  )
}

export default Posts
