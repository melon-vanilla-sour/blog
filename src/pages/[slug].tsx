import type { NextPage, InferGetStaticPropsType, GetStaticPaths } from 'next'
import Image from 'next/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import ErrorPage from 'next/error'
import { buildClient } from '../lib/contentful'
import { EntryCollection } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'

import { Center, Heading, Box } from '@chakra-ui/react'

import Base from '../../components/base'

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
      // target the contentType of the EMBEDDED_ENTRY to display as you need
      if (node.data.target.sys.contentType.sys.id === 'blogPost') {
        return (
          <a href={`/blog/${node.data.target.fields.slug}`}> {node.data.target.fields.title}</a>
        )
      }
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
      // target the contentType of the EMBEDDED_ENTRY to display as you need
      if (node.data.target.sys.contentType.sys.id === 'codeBlock') {
        return (
          <pre>
            <code>{node.data.target.fields.code}</code>
          </pre>
        )
      }
    },

    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      // render the EMBEDDED_ASSET as you need
      return (
        <Box mt="10px" mb="10px">
          <Image
            src={`https:${node.data.target.fields.file.url}`}
            height={node.data.target.fields.file.details.image.height / 2}
            width={node.data.target.fields.file.details.image.width / 2}
            alt={node.data.target.fields.description}
          />
        </Box>
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
      <Head>
        <title>{post.fields.title}</title>
      </Head>
      <Base>
        <Heading size="lg">{post.fields.title}</Heading>
        <div>{documentToReactComponents(post.fields.content, renderOptions)}</div>
        <Link href="/">View all posts</Link>
      </Base>
    </>
  )
}

export default Post
