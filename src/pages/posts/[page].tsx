import Link from 'next/link'

import { postsPerPage } from '../../lib/remoteMd'
import { filterDraftPosts, reorderByDate } from '../../lib/utils'
import { getCachedContent } from '../../lib/remoteMd'

import Pagination from '../../components/Pagination'
import Card from '../../components/Card'

export const getStaticPaths = async () => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)
  const total = markdownContent.length
  const totalPages = Math.ceil(total / postsPerPage)
  const paths = []
  for (let page = 1; page <= totalPages; page++) {
    paths.push({ params: { page: page.toString() } })
  }

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: { params: { page: number } }) => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)
  markdownContent = reorderByDate(markdownContent)
  const upperBound = params.page * postsPerPage
  const lowerBound = upperBound - postsPerPage
  const targetPosts = markdownContent.slice(lowerBound, upperBound)
  const total = markdownContent.length
  const totalPages = Math.ceil(total / postsPerPage)
  const currentPage = params.page

  return {
    props: {
      posts: targetPosts,
      totalPages,
      currentPage,
    },
  }
}

function Posts({
  posts,
  totalPages,
  currentPage,
}: {
  posts
  totalPages: number
  currentPage: number
}) {
  return (
    <>
      <div style={{ margin: '1rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
          <Link href="/categories">
            <a className="tab-focus-outline" style={{ width: '100%', textAlign: 'center' }}>Categories</a>
          </Link>
          <Link href="/tags">
            <a className="tab-focus-outline" style={{ width: '100%', textAlign: 'center' }}>Tags</a>
          </Link>
          <span style={{ width: '100%', textAlign: 'center', opacity: 0.5 }}>Archives</span>
        </div>
      </div>
      <div style={{ display: 'grid', gap: '0.75rem', margin: '1rem 0' }}>
        {posts &&
          posts.map((post, index) => {
            return <Card post={post.value} key={post.value}></Card>
          })}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage}></Pagination>
    </>
  )
}

export default Posts
