import Link from 'next/link'

import { postsPerPage } from '../../lib/remoteMd'
import { filterDraftPosts, reorderByDate } from '../../lib/utils'
import { getCachedContent } from '../../lib/remoteMd'

import Pagination from '../../components/Pagination'
import Card, { buildCategoryColorMap } from '../../components/Card'
import { Jp } from '../../components/deco'

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
  const colorMap = buildCategoryColorMap(markdownContent)
  markdownContent = reorderByDate(markdownContent)
  const upperBound = params.page * postsPerPage
  const lowerBound = upperBound - postsPerPage
  const targetPosts = markdownContent.slice(lowerBound, upperBound)
  const total = markdownContent.length
  const totalPages = Math.ceil(total / postsPerPage)
  const currentPage = params.page
  return { props: { posts: targetPosts, totalPages, currentPage, total, colorMap } }
}

function Posts({ posts, totalPages, currentPage, total, colorMap }: { posts; totalPages: number; currentPage: number; total: number; colorMap: Record<string, string> }) {
  return (
    <>
      <div className="flex items-baseline gap-3 mb-4">
        <h1 className="display-heading text-4xl sm:text-5xl">Posts</h1>
        <Jp>／ 投稿</Jp>
        <span aria-hidden="true" className="ml-auto text-xs text-ink-4 tracking-wider select-none">N={total}</span>
      </div>

      <div className="flex gap-2 mb-4">
        <Link href="/categories">
          <a className="tui-btn tab-focus-outline no-underline hover:no-underline flex-1 text-center uppercase tracking-widest text-xs leading-6">Categories</a>
        </Link>
        <Link href="/tags">
          <a className="tui-btn tab-focus-outline no-underline hover:no-underline flex-1 text-center uppercase tracking-widest text-xs leading-6">Tags</a>
        </Link>
        <span className="tui-btn flex-1 text-center opacity-40 cursor-not-allowed select-none uppercase tracking-widest text-xs leading-6">Archives</span>
      </div>

      <div className="flex flex-col border-t border-ink-2">
        {posts && posts.map((post) => <Card post={post.value} key={post.value} colorMap={colorMap} />)}
      </div>

      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </>
  )
}

export default Posts
