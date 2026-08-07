import Link from 'next/link'
import matter from 'gray-matter'

import { capitalizeString, filterDraftPosts } from '../../lib/utils'
import { getCachedContent } from '../../lib/remoteMd'

import Card, { buildCategoryColorMap } from '../../components/Card'
import { Tag } from '../../components/deco'

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
      <div className="flex items-center gap-3 mb-4">
        <h1 className="display-heading text-3xl sm:text-4xl">{capitalizeString(category)}</h1>
        <Tag style={colorMap[category] ? { color: colorMap[category], borderColor: colorMap[category] } : undefined}>Category</Tag>
        <span className="ml-auto text-sm text-ink-4">{posts.length} posts</span>
      </div>
      <div className="flex flex-col border-t border-ink-2 mb-6">
        {posts && posts.map((post) => <Card post={post.value} key={post.value} colorMap={colorMap} />)}
      </div>
      <div className="flex gap-2">
        <Link href="/posts/1">
          <a className="btn tab-focus-outline no-underline hover:no-underline text-sm">← All posts</a>
        </Link>
        <Link href="/categories">
          <a className="btn tab-focus-outline no-underline hover:no-underline text-sm">Categories</a>
        </Link>
      </div>
    </>
  )
}

export default Category
