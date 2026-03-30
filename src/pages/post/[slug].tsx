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
    const {
      content,
      data: { title = '', slug = '', category = '', tags = [], created },
      // @ts-ignore
    } = matter(post.value)
    return {
      params: { slug: slug },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  let markdownContent = await getCachedContent()
  markdownContent = filterDraftPosts(markdownContent)

  const post = markdownContent.find((post) => {
    const {
      data: { slug = '' },
    } = matter(post.value)
    return slug == params.slug
  })

  const {
    content,
    data: { title = '', slug = '', category = '', tags = [], created },
    // @ts-ignore
  } = matter(post.value)
  const markdownSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkUnwrapImages, remarkGfm, remarkGemoji],
    },
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
    props: {
      toc: tableOfContents,
      post: markdownSource,
      slug: slug,
      title: title,
      category: category,
      tags: tags,
      created: createdString,
      thumbnail: thumbnail,
    },
  }
}

const Post = ({ toc, post, slug, title, category, tags, created, thumbnail }) => {
  const router = useRouter()
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  const components = {
    h2: ({ children, ...props }) => (
      <h2 id={children} style={{ marginBottom: '1.5rem', textAlign: 'start' }} {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 style={{ marginBottom: '1.5rem', textAlign: 'start' }} {...props}>{children}</h3>
    ),
    p: ({ children, ...props }) => (
      <p style={{ paddingBottom: '1.5rem', fontSize: '1rem' }} {...props}>
        {children}
      </p>
    ),
    a: ({ node, href, ...props }) => (
      <a
        style={{ color: 'blue', fontWeight: 600 }}
        target={isInternalLink(href) ? '_self' : '_blank'}
        href={href}
        {...props}
      />
    ),
    ul: ({ children, ...props }) => (
      <ul style={{ paddingBottom: '1.5rem', paddingLeft: '1rem', fontSize: '1rem', listStyleType: 'disc' }} {...props}>
        {children}
      </ul>
    ),
    li: ({ children, ...props }) => (
      <li style={{ marginBottom: '0.5rem' }} {...props}>
        {children}
      </li>
    ),
    ol: ({ children, ...props }) => (
      <ol style={{ paddingBottom: '1.5rem', paddingLeft: '1rem', fontSize: '1rem', listStyleType: 'decimal' }} {...props}>
        {children}
      </ol>
    ),
    img: ({ node, src, alt, ...props }) => (
      <img
        src={src}
        alt={alt}
        style={{ borderRadius: '10px', objectFit: 'contain', maxHeight: '600px', marginBottom: '1.5rem', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
      />
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <div style={{ paddingBottom: '1.5rem', borderRadius: '10px', overflow: 'hidden' }}>
          <SyntaxHighlighter
            {...props}
            children={String(children).replace(/\n$/, '')}
            style={oneDark}
            language={match[1]}
            PreTag="div"
          />
        </div>
      ) : (
        <code style={{ padding: '0 0.25rem', background: 'rgba(0,0,0,0.1)' }} className={className} {...props}>
          {children}
        </code>
      )
    },
    blockquote: ({ children, ...props }) => (
      <blockquote style={{ paddingLeft: '2rem', paddingRight: '2rem' }} {...props}>
        {children}
      </blockquote>
    ),
    table: ({ children, ...props }) => (
      <div style={{ paddingBottom: '1.5rem', overflowX: 'auto' }}>
        <table {...props}>{children}</table>
      </div>
    ),
    thead: ({ children, ...props }) => <thead {...props}>{children}</thead>,
    tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
    tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
    th: ({ children, ...props }) => <th {...props}>{children}</th>,
    td: ({ children, ...props }) => <td {...props}>{children}</td>,
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
      <div>
        <div style={{ borderLeft: '4px solid', margin: '1.25rem 0', paddingLeft: '1rem' }}>
          {title && <h2 style={{ textAlign: 'start', marginBottom: '0.25rem' }}>{title}</h2>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BiFolderOpen />
            {category && <span>{capitalizeString(category)}</span>}
            <TbWriting />
            {created && <span>{created}</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AiOutlineTag />
            {tags && <span>{tags.join(', ')}</span>}
          </div>
        </div>
      </div>
      <div>
        <MDXRemote {...post} components={components} />
      </div>
      <Link href="/posts/1">
        <a className="tab-focus-outline">View all posts</a>
      </Link>
    </>
  )
}

export default Post
