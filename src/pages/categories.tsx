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
    const {
      content,
      data: { category = '' },
    } = matter(post.value)
    if (category && !categories.includes(category)) {
      categories.push(category)
      thumbnails[category] = getImageUrls(content) ? getImageUrls(content)[0] : null
    } else if (category && thumbnails[category] == null) {
      thumbnails[category] = getImageUrls(content) ? getImageUrls(content)[0] : null
    }
  })

  return {
    props: { categories: categories, latestPostThumbnails: thumbnails },
  }
}

function categories({ categories, latestPostThumbnails }) {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', margin: '2rem 0' }}>
        {categories &&
          categories.map((category, index) => {
            return (
              <div className="card tab-focus-outline-nested" key={category}>
                <Link href={`/categories/${category}`}>
                  <a>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <img
                        src={latestPostThumbnails[category] ?? '/ogp.png'}
                        alt="Post Thumbnail"
                        style={{ width: '420px', height: '240px', objectFit: 'cover' }}
                      />
                      <h2 style={{ fontSize: '1.125rem', textAlign: 'start', padding: '0.5rem' }}>
                        {capitalizeString(category)}
                      </h2>
                    </div>
                  </a>
                </Link>
              </div>
            )
          })}
      </div>
      <Link href="/posts/1">
        <a className="tab-focus-outline">View all posts</a>
      </Link>
    </>
  )
}

export default categories
