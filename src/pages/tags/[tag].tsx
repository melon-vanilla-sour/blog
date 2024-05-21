import { Heading, Button, Grid, HStack } from '@chakra-ui/react'
import Link from 'next/link'
import matter from 'gray-matter'

import { filterDraftPosts } from '../../lib/utils'
import { getCachedContent } from '../../lib/remoteMd'

import Card from '../../components/Card'
import Pagination from '../../components/Pagination'

export const getStaticPaths = async () => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)

  const tags = []
  // collect all unique tags
  markdownContent.map((post) => {
    const {
      data: { tags: tagsInPost = [] },
    } = matter(post.value)
    tagsInPost.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    })
  })

  const paths = []
  tags.map((tag) => {
    paths.push({ params: { tag: tag } })
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
      data: { tags: tagsInPost = [] },
    } = matter(post.value)
    return tagsInPost.includes(params.tag)
  })

  return {
    props: {
      tag: params.tag,
      posts: markdownContent,
    },
  }
}

function Tag({ posts }) {
  return (
    <>
      {/* <Heading size='lg' my={6}>{capitalizeString(category)}</Heading> */}
      <Grid templateColumns="repeat(1, 1fr)" gap={{ base: '3', sm: '4' }} my={4}>
        {posts && posts.map((post) => <Card post={post.value} key={post.value}></Card>)}
        <HStack>
          <Link href="/posts/1">
            <Button w={40}>View all posts</Button>
          </Link>
          <Link href="/tags">
            <Button w={40}>View Tags</Button>
          </Link>
        </HStack>
      </Grid>
      {/* <Pagination></Pagination> */}
    </>
  )
}

export default Tag
