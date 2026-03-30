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
      <div style={{ margin: '1.5rem 0' }}>
        {tags &&
          tags.map((tag) => {
            return (
              <div style={{ display: 'inline-block', padding: '0.5rem' }} key={tag.name}>
                <Link href={`/tags/${tag.name}`}>
                  <a className="tab-focus-outline" style={{ fontWeight: 600 }}>
                    {capitalizeString(tag.name)} ({tag.count})
                  </a>
                </Link>
              </div>
            )
          })}
      </div>
      <Link href="/posts/1">
        <a className="tab-focus-outline">View all posts</a>
      </Link>
    </>
  )
}

export default Tags
