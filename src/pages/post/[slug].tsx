import { useRouter } from 'next/router'
import Link from 'next/link'
import ErrorPage from 'next/error'
import Head from 'next/head'

import remarkUnwrapImages from 'remark-unwrap-images'
import remarkGfm from 'remark-gfm'
import remarkGemoji from 'remark-gemoji'
import matter from 'gray-matter'

import { capitalizeString, filterDraftPosts, getImageUrls, isInternalLink } from '../../lib/utils'
import { getCachedContent } from '../../lib/remoteMd'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

import dayjs from 'dayjs'

import { Barcode, Jp } from '../../components/deco'

export const getStaticPaths = async () => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)
  const paths = markdownContent.map((post) => {
    const { data: { slug = '' } } = matter(post.value)  // @ts-ignore
    return { params: { slug } }
  })
  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)

  const post = markdownContent.find((post) => {
    const { data: { slug = '' } } = matter(post.value)
    return slug == params.slug
  })

  const {
    content,
    data: { title = '', slug = '', category = '', tags = [], created },
    // @ts-ignore
  } = matter(post.value)

  const markdownSource = await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkUnwrapImages, remarkGfm, remarkGemoji] },
  })
  const createdString = dayjs(created).format('YYYY-MM-DD')
  const thumbnail = getImageUrls(content) ? getImageUrls(content)[0] : null

  const h2Regex = /^## (.*)$/gm
  const tableOfContents = []
  let match
  while ((match = h2Regex.exec(content)) !== null) {
    tableOfContents.push(match[1])
  }

  return {
    props: { toc: tableOfContents, post: markdownSource, slug, title, category, tags, created: createdString, thumbnail },
  }
}

// Custom code block with TUI-style language header
const CodeBlock = ({ language, children, ...props }) => {
  const codeStyle = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      margin: 0,
      borderRadius: 0,
      background: '#141414',
      fontFamily: 'var(--font-mono)',
    },
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      background: '#141414',
      fontFamily: 'var(--font-mono)',
    },
  }
  return (
    <div className="mb-6">
      <div className="flex items-center border border-b-0 border-ink-2 bg-ink-1 px-3 py-0.5 font-mono">
        <span className="text-ink-3 mr-2 text-xs select-none" aria-hidden="true">┌</span>
        <span className="text-ink-4 text-xs uppercase tracking-widest">{language}</span>
        <span className="flex-1 mx-2 border-t border-ink-2" aria-hidden="true" />
        <span className="text-ink-3 text-xs select-none" aria-hidden="true">┐</span>
      </div>
      <SyntaxHighlighter
        {...props}
        style={codeStyle}
        language={language}
        PreTag="div"
        customStyle={{ border: '1px solid var(--color-ink-2)', borderTop: 'none', fontFamily: 'var(--font-mono)' }}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  )
}

const Post = ({ toc, post, slug, title, category, tags, created, thumbnail }) => {
  const router = useRouter()
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  const components = {
    h2: ({ children, ...props }) => (
      <h2 id={String(children)} className="prose-tight text-xl font-bold text-ink-6 mb-5 mt-6 text-left" {...props}>
        <span className="text-ink-3 select-none" aria-hidden="true">## </span>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="prose-tight text-lg font-bold text-ink-6 mb-4 mt-4 text-left" {...props}>
        <span className="text-ink-3 select-none" aria-hidden="true">### </span>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="prose-tight text-ink-5 text-base leading-relaxed mb-5" {...props}>{children}</p>
    ),
    a: ({ node, href, ...props }) => (
      <a
        className="text-ink-6 hover:text-ink-4 font-medium underline"
        target={isInternalLink(href) ? '_self' : '_blank'}
        href={href}
        {...props}
      />
    ),
    ul: ({ children, ...props }) => (
      <ul className="prose-tight list-disc pl-5 mb-5 text-base text-ink-5 space-y-1" {...props}>{children}</ul>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>{children}</li>
    ),
    ol: ({ children, ...props }) => (
      <ol className="prose-tight list-decimal pl-5 mb-5 text-base text-ink-5 space-y-1" {...props}>{children}</ol>
    ),
    img: ({ node, src, alt, ...props }) => (
      <img
        src={src}
        alt={alt}
        className="max-h-[600px] object-contain mb-5 mx-auto block"
        {...props}
      />
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '')
      if (!inline && match) {
        return <CodeBlock language={match[1]} {...props}>{children}</CodeBlock>
      }
      return (
        <code className="inline-code text-ink-6 text-xs px-1.5 py-0.5 font-mono" {...props}>
          {children}
        </code>
      )
    },
    blockquote: ({ children, ...props }) => (
      <blockquote className="prose-tight border-l-4 border-ink-2 pl-4 text-ink-4 italic mb-5" {...props}>
        {children}
      </blockquote>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto mb-5">
        <table className="w-full border-collapse text-sm" {...props}>{children}</table>
      </div>
    ),
    thead: ({ children, ...props }) => <thead className="bg-ink-1" {...props}>{children}</thead>,
    tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
    tr: ({ children, ...props }) => <tr className="border-b border-ink-2" {...props}>{children}</tr>,
    th: ({ children, ...props }) => <th className="border border-ink-2 px-3 py-1.5 text-left text-xs uppercase tracking-wider text-ink-4" {...props}>{children}</th>,
    td: ({ children, ...props }) => <td className="border border-ink-2 px-3 py-1.5 text-xs text-ink-5" {...props}>{children}</td>,
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`A post about ${tags}`} />
        <meta property="og:title" content={title} key="ogTitle" />
        <meta property="og:url" content={`https://www.melonsour.com/${slug}`} key="ogUrl" />
        {thumbnail && <meta property="og:image" content={thumbnail} key="ogImage" />}
      </Head>

      {/* Title + metadata strip */}
      <div className="mb-6">
        {title && <h1 className="display-heading text-3xl sm:text-5xl leading-tight mb-4">{title}</h1>}
        <div className="border border-ink-2 px-3 py-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-4">
          <span>DATE {created}</span>
          <span className="text-ink-3 select-none" aria-hidden="true">│</span>
          {category && (
            <Link href={`/categories/${category}`}>
              <a className="text-ink-4 hover:text-ink-6 no-underline uppercase">CAT {capitalizeString(category)}</a>
            </Link>
          )}
          {tags && tags.length > 0 && (
            <>
              <span className="text-ink-3 select-none" aria-hidden="true">│</span>
              <span className="uppercase">TAGS [{tags.join(', ')}]</span>
            </>
          )}
          <Barcode seed={slug} className="ml-auto hidden sm:inline-flex" />
        </div>
      </div>

      <div className="text-sm leading-relaxed">
        <MDXRemote {...post} components={components} />
      </div>

      {/* End-of-article marker */}
      <div className="mt-8 flex items-center gap-3 text-xs text-ink-4">
        <Barcode seed={`${slug}-eof`} />
        <span aria-hidden="true" className="tracking-widest select-none">EOF ▪ 終</span>
        <span className="flex-1 border-t border-ink-2" aria-hidden="true" />
      </div>

      <div className="mt-4 pt-4">
        <Link href="/posts/1">
          <a className="tui-btn tab-focus-outline no-underline hover:no-underline uppercase tracking-widest text-xs">← View all posts</a>
        </Link>
      </div>
    </>
  )
}

export default Post
