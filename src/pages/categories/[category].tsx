import Link from 'next/link'
import matter from 'gray-matter'

import { capitalizeString, filterDraftPosts } from '../../lib/utils'
import { getCachedContent } from '../../lib/remoteMd'

import Card, { buildCategoryColorMap } from '../../components/Card'
import { Jp, Label } from '../../components/deco'

export const getStaticPaths = async () => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)
  const categories = []
  markdownContent.map((post) => {
    const { data: { category = '' } } = matter(post.value)
    if (category && !categories.includes(category)) categories.push(category)
  })
  return { paths: categories.map((category) => ({ params: { category } })), fallback: false }
}

export const getStaticProps = async ({ params }) => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)
  const colorMap = buildCategoryColorMap(markdownContent)
  markdownContent = markdownContent.filter((post) => {
    const { data: { category = '' } } = matter(post.value)
    return category == params.category
  })
  return { props: { category: params.category, posts: markdownContent, colorMap } }
}

function Category({ category, posts, colorMap }) {
  return (
    <>
      <div className="flex items-baseline gap-3 mb-4">
        <h1 className="display-heading text-3xl sm:text-4xl">{capitalizeString(category)}</h1>
        <Jp>／ 分類</Jp>
        <Label style={colorMap[category] ? { color: colorMap[category], borderColor: colorMap[category] } : undefined}>CAT</Label>
        <span aria-hidden="true" className="ml-auto text-xs text-ink-4 tracking-wider select-none">N={posts.length}</span>
      </div>
      <div className="flex flex-col gap-3 mb-6">
        {posts && posts.map((post) => <Card post={post.value} key={post.value} colorMap={colorMap} />)}
      </div>
      <div className="flex gap-2">
        <Link href="/posts/1">
          <a className="tui-btn tab-focus-outline no-underline hover:no-underline uppercase tracking-widest text-xs">← All posts</a>
        </Link>
        <Link href="/categories">
          <a className="tui-btn tab-focus-outline no-underline hover:no-underline uppercase tracking-widest text-xs">Categories</a>
        </Link>
      </div>
    </>
  )
}

export default Category
