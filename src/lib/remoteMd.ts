type MarkdownPost = {
  contentUrl: string,
  path: string,
}

export const fetchMarkdownFiles = async (): Promise<MarkdownPost[]> => {
  const repositoryUrl = `https://api.github.com/repos/${process.env.REPOSITORY_URL}/contents`
  const response = await fetch(repositoryUrl)
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
