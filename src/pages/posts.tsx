import { Box, Button, Heading, HStack } from '@chakra-ui/react'
import { buildClient } from '../lib/contentful'
import Link from 'next/link'

import { Center, SimpleGrid, VStack } from '@chakra-ui/react'

import Base from '../../components/base'
import Head from 'next/head'
import PostThumbnail from '../../components/postThumbnail'

const client = buildClient()

export const getStaticProps = async () => {
  const { items } = await client.getEntries({
    content_type: 'post',
    order: '-sys.createdAt',
  })
  return {
    props: { posts: items },
  }
}

function Posts({ posts }) {
  return (
    <Base>
      <Heading mb="40px">Posts</Heading>
      <Box mb={4}>
        <HStack justifyContent="center">
          <Link href="/categories">
            <Button>Categories</Button>
          </Link>
          {/* <Link href="/tags"> */}
          <Button>Tags</Button>
          {/* </Link> */}
        </HStack>
      </Box>
      <VStack alignItems="start">
        {posts &&
          posts.map((post, index) => (
            <PostThumbnail post={post} index={index} key={post.sys.id}></PostThumbnail>
          ))}
      </VStack>
    </Base>
  )
}

export default Posts
