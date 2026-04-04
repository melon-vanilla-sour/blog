import matter from 'gray-matter'
import Link from 'next/link'

import { capitalizeString, filterDraftPosts, getImageUrls } from '../lib/utils'
import { getCachedContent } from '../lib/remoteMd'
import { buildCategoryColorMap } from '../components/Card'

export const getStaticProps = async () => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)
  const categories = []
  const thumbnails = {}
  markdownContent.map((post) => {
    const { content, data: { category = '' } } = matter(post.value)
    if (category && !categories.includes(category)) {
      categories.push(category)
      thumbnails[category] = getImageUrls(content) ? getImageUrls(content)[0] : null
    } else if (category && thumbnails[category] == null) {
      thumbnails[category] = getImageUrls(content) ? getImageUrls(content)[0] : null
    }
  })
  const colorMap = buildCategoryColorMap(markdownContent)
  return { props: { categories, latestPostThumbnails: thumbnails, colorMap } }
}

function Categories({ categories, latestPostThumbnails, colorMap }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {categories && categories.map((category) => (
          <div className="card tab-focus-outline-nested" key={category}>
            <Link href={`/categories/${category}`}>
              <a className="no-underline hover:no-underline">
                <div className="flex">
                  <div className="w-1 shrink-0" style={{ backgroundColor: colorMap[category] }} />
                  <div className="flex flex-col flex-1">
                  <div className="overflow-hidden border-b border-ctp-surface1 h-36 sm:h-52">
                    <img
                      src={latestPostThumbnails[category] ?? '/ogp.png'}
                      alt={category}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-3 py-3">
                    <h2 className="text-ctp-peach text-sm font-medium">{capitalizeString(category)}</h2>
                  </div>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
      <Link href="/posts/1">
        <a className="tui-btn tab-focus-outline no-underline hover:no-underline">← View all posts</a>
      </Link>
    </>
  )
}

export default Categories
