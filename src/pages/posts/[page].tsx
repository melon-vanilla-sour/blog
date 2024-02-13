import { Box, Button, Heading, HStack, Grid, GridItem } from '@chakra-ui/react'
import { buildClient, postsPerPage } from '../../lib/contentful'
import Link from 'next/link'

import Card from '../../components/Card'
import Pagination from '../../components/Pagination'
import { getImageUrls, getSlugFromTitle } from '../../lib/utils'
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
  placeholders,
  markdownFiles,
}: {
  posts
  totalPages: number
  currentPage: number
  placeholders: any[]
  markdownFiles: any[]
}) {
  // filter out draft posts
  posts = posts.filter((post, index) => {
    const {
      content,
      data: { title = '', category = '', tags = [], created, draft },
    } = matter(post.value)
    if (draft == true) {
      return false
    }
    return true;
  })

  return (
    <>
      <Box my={8}>
        <HStack justifyContent="center">
          <Link href="/categories">
            <Button isDisabled={true}>Categories</Button>
          </Link>
          <Button isDisabled={true}>Tags</Button>
          <Button isDisabled={true}>Archives</Button>
        </HStack>
      </Box>
      <Grid templateColumns="repeat(1, 1fr)" gap={{ base: '3', sm: '6' }}>
        {posts &&
          posts.map((post, index) => {
            const {
              content,
              data: { title = '', category = '', tags = [], created },
            } = matter(post.value)
            const slug = getSlugFromTitle(title)

            return (
              <li key={slug}>
                <Link href={`/post/[slug]`} as={`/post/${slug}`} >
                  <a>{title}</a>
                </Link>
              </li>
            )
          })
        }
      </Grid>
      <Pagination totalPages={totalPages}></Pagination>
    </>
  )
}

export default Posts
