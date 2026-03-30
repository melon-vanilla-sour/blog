import matter from 'gray-matter'
import Link from 'next/link'

import { capitalizeString, filterDraftPosts } from '../lib/utils'
import { getCachedContent } from '../lib/remoteMd'

export const getStaticProps = async () => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)
  const tags = []
  markdownContent.map((post) => {
    const { data: { tags: tagsInPost = [] } } = matter(post.value)
    tagsInPost.forEach((tag) => {
      const existing = tags.find((t) => t.name === tag)
      if (existing) {
        existing.count += 1
      } else {
        tags.push({ name: tag, count: 1 })
      }
    })
  })
  tags.sort((a, b) => (a.count < b.count ? 1 : a.count > b.count ? -1 : 0))
  return { props: { tags } }
}

function Tags({ tags }) {
  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {tags && tags.map((tag) => (
          <Link href={`/tags/${tag.name}`} key={tag.name}>
            <a className="tab-focus-outline border border-ctp-surface1 text-ctp-mauve hover:border-ctp-mauve hover:bg-ctp-surface0 px-2 py-0.5 text-xs transition-colors no-underline hover:no-underline">
              {capitalizeString(tag.name)}
              <span className="text-ctp-overlay0 ml-1">({tag.count})</span>
            </a>
          </Link>
        ))}
      </div>
      <Link href="/posts/1">
        <a className="tui-btn tab-focus-outline no-underline hover:no-underline">← View all posts</a>
      </Link>
    </>
  )
}

export default Tags
