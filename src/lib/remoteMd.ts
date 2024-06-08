type MarkdownPost = {
  contentUrl: string
  path: string
}

export const postsPerPage = 20

let cachedData

export const fetchMarkdownFiles = async (): Promise<MarkdownPost[]> => {
  const repositoryUrl = `https://api.github.com/repos/${process.env.REPOSITORY_URL}/contents`
  const response = await fetch(repositoryUrl, {
    headers: {
      Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
    },
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch repository: ${response.statusText}`)
  }

  const contents = await response.json()
  const markdownFiles = contents
    .filter((file) => file.type === 'file' && file.name.endsWith('.md'))
    .map((file) => ({
      path: file.path,
      contentUrl: file.download_url,
    }))

  return markdownFiles
}

export const fetchMarkdownContent = async (markdownFiles) => {
  const posts = await Promise.allSettled(
    markdownFiles.map(async (url) => {
      const res = await fetch(url.contentUrl)
      const content = await res.text()
      return content
    })
  )
  return posts
}

export const getCachedContent = async () => {
  if (cachedData) return cachedData
  const markdownFiles = await fetchMarkdownFiles()
  let markdownContent = await fetchMarkdownContent(markdownFiles)
  markdownContent = markdownContent.reverse()
  cachedData = markdownContent
  return cachedData
}
