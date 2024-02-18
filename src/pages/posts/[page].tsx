import { Box, Button, Heading, HStack, Grid, GridItem } from '@chakra-ui/react'
import { postsPerPage } from '../../lib/contentful'

import Card from '../../components/Card'
import Pagination from '../../components/Pagination'
import { filterDraftPosts, getImageUrls, getSlugFromTitle } from '../../lib/utils'
import { fetchMarkdownFiles, fetchMarkdownContent } from '../../lib/remoteMd'

import { getPlaiceholder } from 'plaiceholder'
import { MDXRemote } from 'next-mdx-remote'
import matter from 'gray-matter'


export const getStaticPaths = async () => {
  const markdownFiles = await fetchMarkdownFiles()
  const total = markdownFiles.length
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
  let markdownFiles = await fetchMarkdownFiles()
  markdownFiles = markdownFiles.reverse()
  const upperBound = params.page * postsPerPage
  const lowerBound = upperBound - postsPerPage
  const targetPostUrls = markdownFiles.slice(lowerBound, upperBound)
  const total = markdownFiles.length
  const totalPages = Math.ceil(total / postsPerPage)
  const currentPage = params.page

  const targetPosts = await fetchMarkdownContent(targetPostUrls)

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
  posts = filterDraftPosts(posts)

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
      <Grid templateColumns="repeat(1, 1fr)" gap={{ base: '3', sm: '6' }} my={8}>
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
