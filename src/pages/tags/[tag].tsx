import Link from 'next/link'
import matter from 'gray-matter'

import { capitalizeString, filterDraftPosts } from '../../lib/utils'
import { getCachedContent } from '../../lib/remoteMd'

import Card, { buildCategoryColorMap } from '../../components/Card'
import { Jp, Label } from '../../components/deco'

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
      <div className="flex items-baseline gap-3 mb-4">
        <h1 className="display-heading text-3xl sm:text-4xl">{capitalizeString(tag)}</h1>
        <Jp>／ タグ</Jp>
        <Label variant="ink">TAG</Label>
        <span aria-hidden="true" className="ml-auto text-xs text-ink-4 tracking-wider select-none">N={posts.length}</span>
      </div>
      <div className="flex flex-col border-t border-ink-2 mb-6">
        {posts && posts.map((post) => <Card post={post.value} key={post.value} colorMap={colorMap} />)}
      </div>
      <div className="flex gap-2">
        <Link href="/posts/1">
          <a className="tui-btn tab-focus-outline no-underline hover:no-underline uppercase tracking-widest text-xs">← All posts</a>
        </Link>
        <Link href="/tags">
          <a className="tui-btn tab-focus-outline no-underline hover:no-underline uppercase tracking-widest text-xs">Tags</a>
        </Link>
      </div>
    </>
  )
}

export default Tag
