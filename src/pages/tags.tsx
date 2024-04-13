import {
  Box,
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
      <Box my={8}>
        {tags &&
          tags.map((tag, index) => {
            return (
              <Box display='inline-block' py={2} px={2} key={tag.name}>
                <Link href={`/tags/${tag.name}`}>
                  <Button>
                    {capitalizeString(tag.name)} ({tag.count})
                  </Button>
                </Link>
              </Box>
            )
          })}
      </Box>
      <Link href="/posts/1">
        <Button w={40}>View all posts</Button>
      </Link>
    </>
  )
}

export default Tags


