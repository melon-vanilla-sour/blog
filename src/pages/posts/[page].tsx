import { Box, Button, Heading, HStack, Grid, GridItem } from '@chakra-ui/react'
import { buildClient, postsPerPage } from '../../lib/contentful'
import Link from 'next/link'

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

export const getStaticProps = async ({ params }: { params: { page: number } }) => {
  const { items, total } = await getPostEntries({
    skip: (params.page - 1) * postsPerPage,
    limit: postsPerPage,
  })
  const totalPages = Math.ceil(total / postsPerPage)
  return {
    props: { posts: items, totalPages: totalPages, currentPage: params.page },
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
      <Heading my={8} size="lg">
        Posts
      </Heading>
      <Box mb={8}>
        <HStack justifyContent="center">
          <Link href="/categories">
            <Button>Categories</Button>
          </Link>
          <Button>Tags</Button>
        </HStack>
      </Box>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} gap={6}>
        {posts &&
          posts.map((post, index) => (
            <GridItem maxW="420px" margin="0 auto">
              <Card post={post} index={index} key={post.sys.id}></Card>
            </GridItem>
          ))}
      </Grid>
      <Pagination totalPages={totalPages}></Pagination>
    </>
  )
}

export default Posts
