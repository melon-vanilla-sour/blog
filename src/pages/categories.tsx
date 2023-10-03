import {
  Box,
  Button,
  Heading,
  HStack,
  Grid,
  useColorModeValue,
  Flex,
  GridItem,
  Icon,
  Image,
} from '@chakra-ui/react'
import { buildClient } from '../lib/contentful'
import Link from 'next/link'
import { capitalizeString, getImageUrls } from '../lib/utils'
import { BiWrench } from 'react-icons/bi'
import { CardTextContainer } from '../components/Card'

const client = buildClient()

// Since 'category' isn't a required field for post, some category entries don't have a 'fields' key
const removeEmptyFields = (categories) => {
  return [...categories].filter((category) => category.fields != null)
}

const removeDuplicates = (categories) => {
  const array = []
  categories.map((category) => {
    if (!array.includes(category.fields.category)) {
      array.push(category.fields.category)
    }
  })
  return array
}

export const getStaticProps = async () => {
  const { items: categories } = await client.getEntries({
    content_type: 'markdownPost',
    order: '-fields.created',
    select: 'fields.category',
  })
  const nonEmptyCategories = removeEmptyFields(categories)
  const uniqueNonEmptyCategories = removeDuplicates(nonEmptyCategories)
  const latestPostThumbnails = []
  // Has to be sequential so thumbnails match category
  for (const category of uniqueNonEmptyCategories) {
    const { items: latestPost } = await client.getEntries({
      content_type: 'markdownPost',
      order: '-fields.created',
      'fields.category': category,
      limit: 1,
    })
    // @ts-ignore
    const latestPostThumbnail = `https:${getImageUrls(latestPost[0].fields.body)[0]}`
    latestPostThumbnails.push(latestPostThumbnail)
  }

  return {
    props: { categories: uniqueNonEmptyCategories, latestPostThumbnails: latestPostThumbnails },
  }
}

function Blog({ categories, latestPostThumbnails }) {
  return (
    <>
      <Grid my={8} templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }} gap={6}>
        {categories &&
          categories.map((category, index) => {
            return (
              <GridItem>
                <Box className="card" cursor="pointer">
                  <Link href={`/categories/${category}`}>
                    <Flex direction="column">
                      <Box
                        as={Image}
                        src={latestPostThumbnails[index]}
                        alt="Post Thumbnail"
                        position="relative"
                        filter={'saturate(130%) brightness(110%)'}
                        w="420px"
                        h="240px"
                        objectFit="cover"
                      ></Box>
                      <CardTextContainer>
                        <Heading fontSize={{ base: 'md', md: 'lg' }} textAlign="start">
                          {capitalizeString(category)}
                        </Heading>
                      </CardTextContainer>
                    </Flex>
                  </Link>
                </Box>
              </GridItem>
            )
          })}
      </Grid>
      <Link href="/posts/1">
        <Button w={40}>View all posts</Button>
      </Link>
    </>
  )
}

export default Blog
