import matter from 'gray-matter'
import Link from 'next/link'

import { capitalizeString, filterDraftPosts, getImageUrls } from '../lib/utils'
import { getCachedContent } from '../lib/remoteMd'
import { buildCategoryColorMap } from '../components/Card'
import { Tag } from '../components/deco'

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
      <h1 className="display-heading text-4xl sm:text-5xl mb-4">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {categories && categories.map((category) => (
          <div className="card tab-focus-outline-nested group" key={category}>
            <Link href={`/categories/${category}`}>
              <a className="no-underline hover:no-underline">
                <div className="flex flex-col">
                  <div className="overflow-hidden border-b border-ink-2 h-36 sm:h-52">
                    <img
                      src={latestPostThumbnails[category] ?? '/ogp.png'}
                      alt={category}
                      className="w-full h-full object-cover brightness-90 saturate-[1.1]"
                    />
                  </div>
                  <div className="px-3 py-3">
                    <Tag style={colorMap[category] ? { color: colorMap[category], borderColor: colorMap[category] } : undefined}>
                      {capitalizeString(category)}
                    </Tag>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
      <Link href="/posts/1">
        <a className="btn tab-focus-outline no-underline hover:no-underline text-sm">← View all posts</a>
      </Link>
    </>
  )
}

export default Categories
