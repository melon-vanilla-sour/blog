import { Box, Button } from '@chakra-ui/react'
import matter from 'gray-matter'
import Link from 'next/link'

import { capitalizeString, filterDraftPosts } from '../lib/utils'

import { getCachedContent } from '../lib/remoteMd'

export const getStaticProps = async () => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)

  const tags = []
  markdownContent.map((post) => {
    const {
      data: { tags: tagsInPost = [] },
    } = matter(post.value)
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
      <Box my={6}>
        {tags &&
          tags.map((tag) => {
            return (
              <Box display="inline-block" padding={{ base: 1, sm: 2 }} key={tag.name}>
                <Link href={`/tags/${tag.name}`}>
                  <Button fontSize={{ base: 'sm', sm: 'md' }} padding={2} fontWeight="semibold">
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
