import { Box, Button, Heading, HStack, Grid, GridItem } from '@chakra-ui/react'
import { buildClient, postsPerPage } from '../../lib/contentful'
import Link from 'next/link'

import Card from '../../components/Card'
import Pagination from '../../components/Pagination'

const client = buildClient()

const getPostEntries = async (options) => {
  const { items, total } = await client.getEntries({
    content_type: 'markdownPost',
    order: 'fields.created',
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
      <Box my={8}>
        <HStack justifyContent="center">
          <Link href="/categories">
            <Button>Categories</Button>
          </Link>
          <Button isDisabled={true}>Tags</Button>
          <Button isDisabled={true}>Archives</Button>
        </HStack>
      </Box>
      <Grid templateColumns="repeat(1, 1fr)" gap={{ base: '3', sm: '6' }}>
        {posts &&
          posts.map((post, index) => (
            <GridItem key={post.sys.id}>
              <Card post={post} index={index}></Card>
            </GridItem>
          ))}
      </Grid>
      <Pagination totalPages={totalPages}></Pagination>
    </>
  )
}

export default Posts
