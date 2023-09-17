export const capitalizeString = (string) => string.charAt(0).toUpperCase() + string.slice(1)

export const getImageUrls = (markdown) => {
  const pattern = /(?<=\()\/\/images\.ctfassets\.net\/[^\s]+(?=\))/g
  return markdown.match(pattern)
}

export const getInternalLinks = (markdown) => {
  const pattern = /(?<=\|)([^|]+)(?=\|)/g
  return markdown.match(pattern)
}
