import { Box, Button, Heading, HStack, Grid, GridItem } from '@chakra-ui/react'
import { buildClient, postsPerPage } from '../../lib/contentful'
import Link from 'next/link'

import Card from '../../components/Card'
import Pagination from '../../components/Pagination'
import { getImageUrls } from '../../lib/utils'

import { getPlaiceholder } from 'plaiceholder'

const client = buildClient()

const getPostEntries = async (options) => {
  const { items, total } = await client.getEntries({
    content_type: 'markdownPost',
    order: '-fields.created',
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

  const placeholders = []
  await Promise.all(
    items.map(async (item, index) => {
      // @ts-ignore
      const imageUrls = getImageUrls(item.fields.body)
      if (!imageUrls) return
      const { base64, img } = await getPlaiceholder(`https:${imageUrls[0]}`)
      placeholders[index] = { ...img, blurDataURL: base64 }
    })
  )
  const totalPages = Math.ceil(total / postsPerPage)
  return {
    props: {
      posts: items,
      totalPages: totalPages,
      currentPage: params.page,
      placeholders: placeholders,
    },
  }
}
function Posts({
  posts,
  totalPages,
  currentPage,
  placeholders,
}: {
  posts
  totalPages: number
  currentPage: number
  placeholders: any[]
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
              <Card post={post} index={index} thumbnail={placeholders[index]}></Card>
            </GridItem>
          ))}
      </Grid>
      <Pagination totalPages={totalPages}></Pagination>
    </>
  )
}

export default Posts
