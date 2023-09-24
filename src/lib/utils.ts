export const capitalizeString = (string) => string.charAt(0).toUpperCase() + string.slice(1)

// Regular expression to match the URL pattern without capturing the brackets
// (//images.ctfassets.net/vt3fzpmlfg71/4bS2qmHhXVIC6tHWKrPE8t/d22d9cbdd1bb9a3c37b6ccbf74ca246a/IMG_8570.JPG)
// global flag at the end ensures all matches
export const getImageUrls = (markdown) => {
  const pattern = /(?<=\()\/\/images\.ctfassets\.net\/[^\s]+(?=\))/g
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
