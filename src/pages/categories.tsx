import matter from 'gray-matter'
import Link from 'next/link'

import { capitalizeString, filterDraftPosts, getImageUrls } from '../lib/utils'
import { getCachedContent } from '../lib/remoteMd'
import { buildCategoryColorMap } from '../components/Card'
import { Jp, Label } from '../components/deco'

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
      <div className="flex items-baseline gap-3 mb-4">
        <h1 className="display-heading text-4xl sm:text-5xl">Categories</h1>
        <Jp>／ 分類</Jp>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
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
                    <Label style={colorMap[category] ? { color: colorMap[category], borderColor: colorMap[category] } : undefined}>
                      {capitalizeString(category)}
                    </Label>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>
      <Link href="/posts/1">
        <a className="tui-btn tab-focus-outline no-underline hover:no-underline uppercase tracking-widest text-xs">← View all posts</a>
      </Link>
    </>
  )
}

export default Categories
