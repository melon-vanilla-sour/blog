import Link from 'next/link'
import matter from 'gray-matter'

import { filterDraftPosts } from '../../lib/utils'
import { getCachedContent } from '../../lib/remoteMd'

import Card from '../../components/Card'

export const getStaticPaths = async () => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)

  const tags = []
  markdownContent.map((post) => {
    const {
      data: { tags: tagsInPost = [] },
    } = matter(post.value)
    tagsInPost.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag)
      }
    })
  })

  const paths = []
  tags.map((tag) => {
    paths.push({ params: { tag: tag } })
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
      data: { tags: tagsInPost = [] },
    } = matter(post.value)
    return tagsInPost.includes(params.tag)
  })

  return {
    props: {
      tag: params.tag,
      posts: markdownContent,
    },
  }
}

function Tag({ posts }) {
  return (
    <>
      <div style={{ display: 'grid', gap: '0.75rem', margin: '1.5rem 0' }}>
        {posts && posts.map((post) => <Card post={post.value} key={post.value}></Card>)}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Link href="/posts/1">
            <a className="tab-focus-outline">View all posts</a>
          </Link>
          <Link href="/tags">
            <a className="tab-focus-outline">View Tags</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Tag
