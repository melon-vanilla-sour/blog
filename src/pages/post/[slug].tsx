import type { NextPage, InferGetStaticPropsType, GetStaticPaths } from 'next'
// import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ErrorPage from 'next/error'

import { buildClient } from '../../lib/contentful'
import { EntryCollection } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { monokai } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import { Center, Heading, Box, Text, Button, SlideFade, Image } from '@chakra-ui/react'

import Base from '../../components/layout/base'

const client = buildClient()

const getPostEntries = async () => {
  const { items } = await client.getEntries({
    content_type: 'post',
  })
  return items
}

export const getStaticPaths = async () => {
  const items = await getPostEntries()
  const paths = items.map((item) => {
    return {
      // @ts-ignore
      params: { slug: item.fields.slug },
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const items = await getPostEntries()
  const post = items.find((item) => {
    // @ts-ignore
    return item.fields.slug == params.slug
  })
  return {
    props: {
      post: post,
    },
  }
}

const renderOptions = {
  renderNode: {
    [INLINES.EMBEDDED_ENTRY]: (node, children) => {
      if (node.data.target.sys.contentType.sys.id === 'blogPost') {
        return (
          <a href={`/blog/${node.data.target.fields.slug}`}> {node.data.target.fields.title}</a>
        )
      }
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      if (node.data.target.sys.contentType.sys.id === 'codeBlock') {
        return (
          <pre>
            <code>{node.data.target.fields.code}</code>
          </pre>
        )
      }
    },

    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      return (
        <Box
          mb={8}
          filter={'saturate(110%) brightness(110%)'}
          borderRadius={12}
          overflow="hidden"
          boxShadow="md"
        >
          <Image
            src={`https:${node.data.target.fields.file.url}`}
            // height={node.data.target.fields.file.details.image.height / 1.7}
            width={node.data.target.fields.file.details.image.width / 1.7}
            alt={node.data.target.fields.description}
          />
        </Box>
      )
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (node.content.length === 1 && node.content[0].marks.find((x) => x.type === 'code')) {
        return <Box pb={8}>{children} </Box>
      }
      return (
        <Text pb={8} fontSize="lg">
          {children}
        </Text>
      )
    },
  },
  renderMark: {
    [MARKS.CODE]: (text) => {
      text = text.split('\n')
      const language = text.shift() // コードブロックの1行目の言語指定をClassに利用後削除
      text = text.join('\n')

      // const value = text.reduce((acc, cur) => {
      //   if (typeof cur !== 'string' && cur.type === 'br') {
      //     return acc + '\n'
      //   }
      //   return acc + cur
      // }, '')

      return (
        <SyntaxHighlighter language={language} style={monokai} showLineNumbers wrapLongLines="true">
          {text}
        </SyntaxHighlighter>
      )
    },
  },
}

const Post = ({ post }) => {
  const router = useRouter()
  if (!router.isFallback && !post.fields.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <>
        <Heading my={8}>{post.fields.title}</Heading>
        <div>{documentToReactComponents(post.fields.content, renderOptions)}</div>
        <Link href="/posts/1">
          <Button w={40}>View all posts</Button>
        </Link>
      </>
    </>
  )
}

export default Post