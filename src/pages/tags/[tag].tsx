import Link from 'next/link'
import matter from 'gray-matter'

import { capitalizeString, filterDraftPosts } from '../../lib/utils'
import { getCachedContent } from '../../lib/remoteMd'

import Card, { buildCategoryColorMap } from '../../components/Card'
import { Tag as Chip } from '../../components/deco'

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
  const colorMap = buildCategoryColorMap(markdownContent)
  markdownContent = markdownContent.filter((post) => {
    const { data: { tags: tagsInPost = [] } } = matter(post.value)
    return tagsInPost.includes(params.tag)
  })
  return { props: { tag: params.tag, posts: markdownContent, colorMap } }
}

function Tag({ tag, posts, colorMap }) {
  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <h1 className="display-heading text-3xl sm:text-4xl">{capitalizeString(tag)}</h1>
        <Chip variant="solid">Tag</Chip>
        <span className="ml-auto text-sm text-ink-4">{posts.length} posts</span>
      </div>
      <div className="flex flex-col border-t border-ink-2 mb-6">
        {posts && posts.map((post) => <Card post={post.value} key={post.value} colorMap={colorMap} />)}
      </div>
      <div className="flex gap-2">
        <Link href="/posts/1">
          <a className="btn tab-focus-outline no-underline hover:no-underline text-sm">← All posts</a>
        </Link>
        <Link href="/tags">
          <a className="btn tab-focus-outline no-underline hover:no-underline text-sm">Tags</a>
        </Link>
      </div>
    </>
  )
}

export default Tag
