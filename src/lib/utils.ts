import matter from "gray-matter";

export const capitalizeString = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const getSlugFromTitle = (title: string) => {
  const lowercaseString = title.toLowerCase()
  // Replace spaces with hyphens
  const slug = lowercaseString.replace(/\s+/g, '-');
  return slug
}

// Regular expression to match the URL pattern without capturing the brackets
// (//images.ctfassets.net/vt3fzpmlfg71/4bS2qmHhXVIC6tHWKrPE8t/d22d9cbdd1bb9a3c37b6ccbf74ca246a/IMG_8570.JPG)
// global flag at the end ensures all matches
// export const getImageUrls = (markdown) => {
//   const pattern = /(?<=\()\/\/images\.ctfassets\.net\/[^\s]+(?=\))/g
//   return markdown.match(pattern)
// }

export const getImageUrls = (markdown) => {
  const pattern = /(?<=\()https:\/\/melon-sour-blog-images\.s3\.amazonaws\.com\/[a-zA-Z0-9-.]+(?=\))/g
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
      content,
      data: { title = '', category = '', tags = [], created, draft },
    } = matter(post.value)
    if (draft == true) {
      return false
    }
    return true;
  })
}

export const googleTagManagerId = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || '';
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}
