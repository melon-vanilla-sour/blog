import matter from 'gray-matter'
import Link from 'next/link'

import { capitalizeString, filterDraftPosts, getImageUrls } from '../lib/utils'
import { getCachedContent } from '../lib/remoteMd'

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
  return { props: { categories, latestPostThumbnails: thumbnails } }
}

function Categories({ categories, latestPostThumbnails }) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {categories && categories.map((category) => (
          <div className="card tab-focus-outline-nested" key={category}>
            <Link href={`/categories/${category}`}>
              <a className="no-underline hover:no-underline">
                <div className="flex flex-col">
                  <div className="overflow-hidden border-b border-ctp-surface1 h-36 sm:h-52">
                    <img
                      src={latestPostThumbnails[category] ?? '/ogp.png'}
                      alt={category}
                      className="w-full h-full object-cover opacity-80"
                    />
                  </div>
                  <div className="px-3 py-2">
                    <h2 className="text-ctp-peach text-sm font-medium">{capitalizeString(category)}</h2>
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
