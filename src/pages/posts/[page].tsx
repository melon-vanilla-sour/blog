import { Box, Button, Heading, HStack } from '@chakra-ui/react'
import { buildClient, postsPerPage } from '../../lib/contentful'
import Link from 'next/link'

import { Center, SimpleGrid, VStack } from '@chakra-ui/react'

import Base from '../../components/layout/base'
import Head from 'next/head'
import Card from '../../components/Card'
import Pagination from '../../components/Pagination'

const client = buildClient()

const getPostEntries = async (options) => {
  const { items, total } = await client.getEntries({
    content_type: 'post',
    order: '-sys.createdAt',
    ...options,
  })
  return { items, total }
}

export const getStaticPaths = async () => {
  const { total } = await getPostEntries({})
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

export const getStaticProps = async ({ params }) => {
  const { items, total } = await getPostEntries({
    skip: (params.page - 1) * postsPerPage,
    limit: postsPerPage,
  })
  const totalPages = Math.ceil(total / postsPerPage)
  return {
    props: { posts: items, totalPages: totalPages, currentPage: params.page },
  }
}

function Posts({ posts, totalPages, currentPage }) {
  return (
    <>
      <Heading my={4}>Posts</Heading>
      <Box mb={4}>
        <HStack justifyContent="center">
          <Link href="/categories">
            <Button>Categories</Button>
          </Link>
          <Button>Tags</Button>
        </HStack>
      </Box>
      <VStack alignItems="center" w="full">
        {posts &&
          posts.map((post, index) => <Card post={post} index={index} key={post.sys.id}></Card>)}
      </VStack>
      <Pagination {...totalPages}></Pagination>
    </>
  )
}

export default Posts
