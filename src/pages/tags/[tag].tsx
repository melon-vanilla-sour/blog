import Link from 'next/link'
import matter from 'gray-matter'

import { capitalizeString, filterDraftPosts } from '../../lib/utils'
import { getCachedContent } from '../../lib/remoteMd'

import Card from '../../components/Card'

export const getStaticPaths = async () => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)
  const tags = []
  markdownContent.map((post) => {
    const { data: { tags: tagsInPost = [] } } = matter(post.value)
    tagsInPost.forEach((tag) => { if (!tags.includes(tag)) tags.push(tag) })
  })
  return { paths: tags.map((tag) => ({ params: { tag } })), fallback: false }
}

export const getStaticProps = async ({ params }) => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)
  markdownContent = markdownContent.filter((post) => {
    const { data: { tags: tagsInPost = [] } } = matter(post.value)
    return tagsInPost.includes(params.tag)
  })
  return { props: { tag: params.tag, posts: markdownContent } }
}

function Tag({ tag, posts }) {
  return (
    <>
      <h2 className="text-ctp-mauve text-base font-medium mb-4">
        <span className="text-ctp-surface2">tag /</span> {capitalizeString(tag)}
      </h2>
      <div className="flex flex-col gap-2 mb-6">
        {posts && posts.map((post) => <Card post={post.value} key={post.value} />)}
      </div>
      <div className="flex gap-2">
        <Link href="/posts/1">
          <a className="tui-btn tab-focus-outline no-underline hover:no-underline">← All posts</a>
        </Link>
        <Link href="/tags">
          <a className="tui-btn tab-focus-outline no-underline hover:no-underline">Tags</a>
        </Link>
      </div>
    </>
  )
}

export default Tag
