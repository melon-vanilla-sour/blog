import matter from 'gray-matter'

export const capitalizeString = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const getSlugFromTitle = (title: string) => {
  let lowercaseString = title.toLowerCase()
  // remove commas and periods
  lowercaseString = lowercaseString.replace(/[,.]/g, '')
  // Replace spaces with hyphens
  const slug = lowercaseString.replace(/\s+/g, '-')
  return slug
}

export const getFirstLines = (markdown: string) => {}

export const getImageUrls = (markdown) => {
  // const pattern = /https:\/\/melon-sour-blog-images\.s3\.amazonaws\.com\/[a-zA-Z0-9-.]+/g
  const pattern = /https:\/\/d2pdw9m8ako0ty\.cloudfront\.net\/[a-zA-Z0-9-.]+/g
  return markdown.match(pattern)
}

export const isInternalLink = (markdown) => {
  const pattern = /^\/post/
  return markdown.match(pattern)
}

export const getPlaceholders = async (posts, getPlaiceholder) => {
  const placeholders = []
  await Promise.all(
    posts.map(async (item, index) => {
      const imageUrls = getImageUrls(item.fields.body)
      const { base64, img } = await getPlaiceholder(`https:${imageUrls[0]}`)
      placeholders[index] = { ...img, blurDataURL: base64 }
    })
  )
  return placeholders
}

export const filterDraftPosts = (posts) => {
  return posts.filter((post) => {
    const {
      data: { draft },
    } = matter(post.value)
    if (draft == true) {
      return false
    }
    return true
  })
}

export const reorderByDate = (posts) => {
  return posts.sort((postA, postB) => {
    const {
      data: { created: createdA },
    } = matter(postA.value)
    const {
      data: { created: createdB },
    } = matter(postB.value)
    return createdA < createdB ? 1 : createdA > createdB ? -1 : 0
  })
}

export const googleTagManagerId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || ''
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export const doNotRender = (slug) => {
  const secretPosts = ['holoview']
  if (secretPosts.includes(slug)) {
    return true
  }
  return false
}
