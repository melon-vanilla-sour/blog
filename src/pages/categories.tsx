import { Box, Button, Heading, Grid, Flex, Image } from '@chakra-ui/react'
import matter from 'gray-matter'
import Link from 'next/link'

import { capitalizeString, filterDraftPosts, getImageUrls } from '../lib/utils'

import { CardTextContainer } from '../components/Card'
import { getCachedContent } from '../lib/remoteMd'

export const getStaticProps = async () => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)
  const categories = []
  const thumbnails = {}
  markdownContent.map((post) => {
    const {
      content,
      data: { category = '' },
    } = matter(post.value)
    if (category && !categories.includes(category)) {
      categories.push(category)
      thumbnails[category] = getImageUrls(content) ? getImageUrls(content)[0] : null
    } else if (category && thumbnails[category] == null) {
      // if latest post doesn't have any images to use as a thumbnail override with images in next post
      thumbnails[category] = getImageUrls(content) ? getImageUrls(content)[0] : null
    }
  })

  return {
    props: { categories: categories, latestPostThumbnails: thumbnails },
  }
}

function categories({ categories, latestPostThumbnails }) {
  return (
    <>
      <Grid
        my={8}
        templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)' }}
        gap={{ base: '3', sm: '6' }}
      >
        {categories &&
          categories.map((category, index) => {
            return (
              <Box className="card" cursor="pointer" key={category}>
                <Link href={`/categories/${category}`}>
                  <Flex direction="column">
                    <Box
                      as={Image}
                      src={latestPostThumbnails[category] ?? '/ogp.png'}
                      alt="Post Thumbnail"
                      position="relative"
                      filter={'saturate(110%) brightness(110%)'}
                      w="420px"
                      h={{ base: '140px', sm: '240px' }}
                      objectFit="cover"
                    ></Box>
                    <Heading fontSize={{ base: 'lg', md: 'lg' }} textAlign="start" p={2}>
                      {capitalizeString(category)}
                    </Heading>
                  </Flex>
                </Link>
              </Box>
            )
          })}
      </Grid>
      <Link href="/posts/1">
        <Button w={40} className="tab-focus-outline">
          View all posts
        </Button>
      </Link>
    </>
  )
}

export default categories
