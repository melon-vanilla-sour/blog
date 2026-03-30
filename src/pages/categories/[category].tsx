import Link from 'next/link'
import matter from 'gray-matter'

import { capitalizeString, filterDraftPosts } from '../../lib/utils'
import { getCachedContent } from '../../lib/remoteMd'

import Card from '../../components/Card'

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
  markdownContent = markdownContent.filter((post) => {
    const { data: { category = '' } } = matter(post.value)
    return category == params.category
  })
  return { props: { category: params.category, posts: markdownContent } }
}

function Category({ category, posts }) {
  return (
    <>
      <h2 className="text-ctp-peach text-base font-medium mb-4">
        <span className="text-ctp-surface2">category /</span> {capitalizeString(category)}
      </h2>
      <div className="flex flex-col gap-2 mb-6">
        {posts && posts.map((post) => <Card post={post.value} key={post.value} />)}
      </div>
      <div className="flex gap-2">
        <Link href="/posts/1">
          <a className="tui-btn tab-focus-outline no-underline hover:no-underline">← All posts</a>
        </Link>
        <Link href="/categories">
          <a className="tui-btn tab-focus-outline no-underline hover:no-underline">Categories</a>
        </Link>
      </div>
    </>
  )
}

export default Category
