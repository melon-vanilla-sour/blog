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

import { TbWriting } from 'react-icons/tb'
import { BiFolderOpen } from 'react-icons/bi'
import { AiOutlineTag } from 'react-icons/ai'
import dayjs from 'dayjs'

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
  const createdString = dayjs(created).format('DD/MM/YYYY')
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
      background: '#1e2030',
    },
  }
  return (
    <div className="mb-6">
      <div className="flex items-center border border-b-0 border-ctp-surface1 bg-ctp-surface0 px-3 py-0.5">
        <span className="text-ctp-surface1 mr-2 text-xs">┌</span>
        <span className="text-ctp-green text-xs">{language}</span>
        <span className="flex-1 mx-2 border-t border-ctp-surface1" />
        <span className="text-ctp-surface1 text-xs">┐</span>
      </div>
      <SyntaxHighlighter
        {...props}
        style={codeStyle}
        language={language}
        PreTag="div"
        customStyle={{ border: '1px solid #494d64', borderTop: 'none' }}
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
      <h2 id={String(children)} className="text-lg font-semibold text-ctp-text mb-5 mt-2 text-left" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-base font-semibold text-ctp-text mb-4 mt-1 text-left" {...props}>{children}</h3>
    ),
    p: ({ children, ...props }) => (
      <p className="text-ctp-subtext1 text-sm leading-relaxed mb-5" {...props}>{children}</p>
    ),
    a: ({ node, href, ...props }) => (
      <a
        className="text-ctp-sapphire hover:text-ctp-sky font-medium underline"
        target={isInternalLink(href) ? '_self' : '_blank'}
        href={href}
        {...props}
      />
    ),
    ul: ({ children, ...props }) => (
      <ul className="list-disc pl-5 mb-5 text-sm text-ctp-subtext1 space-y-1" {...props}>{children}</ul>
    ),
    li: ({ children, ...props }) => (
      <li className="leading-relaxed" {...props}>{children}</li>
    ),
    ol: ({ children, ...props }) => (
      <ol className="list-decimal pl-5 mb-5 text-sm text-ctp-subtext1 space-y-1" {...props}>{children}</ol>
    ),
    img: ({ node, src, alt, ...props }) => (
      <img
        src={src}
        alt={alt}
        className="max-h-[600px] object-contain mb-5 mx-auto block opacity-90"
        {...props}
      />
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '')
      if (!inline && match) {
        return <CodeBlock language={match[1]} {...props}>{children}</CodeBlock>
      }
      return (
        <code className="bg-ctp-surface0 text-ctp-green text-xs px-1.5 py-0.5 font-mono" {...props}>
          {children}
        </code>
      )
    },
    blockquote: ({ children, ...props }) => (
      <blockquote className="border-l-4 border-ctp-surface1 pl-4 text-ctp-subtext0 italic mb-5" {...props}>
        {children}
      </blockquote>
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto mb-5">
        <table className="w-full border-collapse text-sm" {...props}>{children}</table>
      </div>
    ),
    thead: ({ children, ...props }) => <thead className="bg-ctp-surface0" {...props}>{children}</thead>,
    tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
    tr: ({ children, ...props }) => <tr className="border-b border-ctp-surface1" {...props}>{children}</tr>,
    th: ({ children, ...props }) => <th className="border border-ctp-surface1 px-3 py-1.5 text-left text-xs uppercase tracking-wider text-ctp-subtext0" {...props}>{children}</th>,
    td: ({ children, ...props }) => <td className="border border-ctp-surface1 px-3 py-1.5 text-xs text-ctp-subtext1" {...props}>{children}</td>,
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

      {/* Post metadata block */}
      <div className="border border-ctp-surface1 mb-6 p-4">
        {title && <h1 className="text-base font-semibold text-ctp-text mb-3 text-left">{title}</h1>}
        <div className="flex flex-wrap items-center gap-3 text-xs mb-1.5">
          <span className="flex items-center gap-1 text-ctp-peach">
            <BiFolderOpen />
            {category && <span>{capitalizeString(category)}</span>}
          </span>
          <span className="text-ctp-surface2">│</span>
          <span className="flex items-center gap-1 text-ctp-yellow">
            <TbWriting />
            {created && <span>{created}</span>}
          </span>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-ctp-mauve">
            <AiOutlineTag />
            <span>{tags.join(', ')}</span>
          </div>
        )}
      </div>

      <div className="text-sm leading-relaxed">
        <MDXRemote {...post} components={components} />
      </div>

      <div className="mt-8 pt-4 border-t border-ctp-surface1">
        <Link href="/posts/1">
          <a className="tui-btn tab-focus-outline no-underline hover:no-underline">← View all posts</a>
        </Link>
      </div>
    </>
  )
}

export default Post
