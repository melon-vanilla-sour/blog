import {
  Button,
  Grid,
} from '@chakra-ui/react'
import matter from 'gray-matter'
import Link from 'next/link'

import { capitalizeString, filterDraftPosts } from '../lib/utils'

import { getCachedContent } from '../lib/remoteMd'

export const getStaticProps = async () => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)
  const tags = []
  markdownContent.map((post) => {
    const { content, data: { tags: tagsInPost = [] } } = matter(post.value)
    tagsInPost.forEach((tag) => {
      const existingTag = tags.find((tagObject) => {
        return tagObject['name'] === tag
      })
      if (existingTag) {
        existingTag.count += 1
      } else {
        tags.push({ name: tag, count: 1 })
      }
    })
  })

  tags.sort((tagA, tagB) => {
    return tagA.count < tagB.count ? 1 : tagA.count > tagB.count ? -1 : 0
  })

  return {
    props: { tags: tags },
  }
}

function Tags({ tags }) {
  return (
    <>
      <Grid my={8} templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
        {tags &&
          tags.map((tag, index) => {
            return (
              <Link href={`/tags/${tag.name}`}>
                <Button>
                  {capitalizeString(tag.name)} ({tag.count})
                </Button>
              </Link>
            )
          })}
      </Grid>
      <Link href="/posts/1">
        <Button w={40}>View all posts</Button>
      </Link>
    </>
  )
}

export default Tags


