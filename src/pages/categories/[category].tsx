import Link from 'next/link'
import matter from 'gray-matter'

import { filterDraftPosts } from '../../lib/utils'
import { getCachedContent } from '../../lib/remoteMd'

import Card from '../../components/Card'

export const getStaticPaths = async () => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)

  const categories = []
  markdownContent.map((post) => {
    const {
      data: { category = '' },
    } = matter(post.value)
    if (category && !categories.includes(category)) {
      categories.push(category)
    }
  })

  const paths = []
  categories.map((category) => {
    paths.push({ params: { category: category } })
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)

  markdownContent = markdownContent.filter((post) => {
    const {
      data: { category = '' },
    } = matter(post.value)
    return category == params.category
  })

  return {
    props: {
      category: params.category,
      posts: markdownContent,
    },
  }
}

function Category({ category, posts }) {
  return (
    <>
      <div style={{ display: 'grid', gap: '0.75rem', margin: '1.5rem 0' }}>
        {posts && posts.map((post, index) => <Card post={post.value} key={post.value}></Card>)}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link href="/posts/1">
            <a className="tab-focus-outline">View all posts</a>
          </Link>
          <Link href="/categories">
            <a className="tab-focus-outline">View Categories</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Category
