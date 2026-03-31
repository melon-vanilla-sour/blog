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
  return { paths, fallback: false }
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
  return { props: { posts: targetPosts, totalPages, currentPage } }
}

function Posts({ posts, totalPages, currentPage }: { posts; totalPages: number; currentPage: number }) {
  return (
    <>
      <div className="flex gap-2 mb-4">
        <Link href="/categories">
          <a className="tui-btn tab-focus-outline no-underline hover:no-underline flex-1 text-center">Categories</a>
        </Link>
        <Link href="/tags">
          <a className="tui-btn tab-focus-outline no-underline hover:no-underline flex-1 text-center">Tags</a>
        </Link>
        <span className="tui-btn flex-1 text-center opacity-40 cursor-not-allowed select-none">Archives</span>
      </div>

      <div className="flex flex-col gap-3">
        {posts && posts.map((post) => <Card post={post.value} key={post.value} />)}
      </div>

      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  )
}

export default Posts
