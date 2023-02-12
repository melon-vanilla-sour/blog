import { useRouter } from 'next/router'
import Link from 'next/link'
import ErrorPage from 'next/error'

import { buildClient } from '../../lib/contentful'
import { EntryCollection } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import {
  Heading,
  Box,
  Text,
  Button,
  Flex,
  Image,
  useColorModeValue,
  Link as ChakraLink,
  TableContainer,
  Tbody,
  Table,
  Td,
  Tr,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import Card from '../../components/Card'

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

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
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
      } else if (node.data.target.sys.contentType.sys.id === 'post') {
        return (
          <Flex maxW="420px" mb={8} mx="auto">
            <Card post={node.data.target} index={1}></Card>
          </Flex>
        )
      }
    },

    [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
      const imageWidth = node.data.target.fields.file.details.image.width
      const imageHeight = node.data.target.fields.file.details.image.height
      const maxHeight = '600px'
      return (
        <Flex mb={8} filter={'saturate(110%) brightness(110%)'} justifyContent="center">
          <Image
            src={`https:${node.data.target.fields.file.url}?fm=webp&h=600`}
            maxH={{ base: '350px', sm: '600px' }}
            borderRadius="10px"
            // border="2px solid"
            // borderColor={useColorModeValue('gray.700', 'gray.300')}
          />
        </Flex>
      )
    },
    [BLOCKS.PARAGRAPH]: (node, children) => {
      if (node.content.length === 1 && node.content[0].marks.find((x) => x.type === 'code')) {
        return <Box pb={8}>{children} </Box>
      }

      return (
        <Text pb={6} fontSize="md">
          {children}
        </Text>
      )
    },
    [BLOCKS.HEADING_2]: (node, children) => {
      return (
        <Heading size="md" mb={2} textAlign="start">
          {children}
        </Heading>
      )
    },
    [INLINES.HYPERLINK]: (node, children) => {
      return (
        <ChakraLink
          href={node.data.uri}
          color={useColorModeValue('blue.500', 'blue.300')}
          fontWeight="semibold"
        >
          {node.content[0].value}
        </ChakraLink>
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
        <SyntaxHighlighter
          language={language}
          style={atomOneDarkReasonable}
          showLineNumbers
          class="code-block"
        >
          {text}
        </SyntaxHighlighter>
      )
    },
  },
}

const getHeadings = (post) => {
  const headings: string[] = []
  post.fields.content.content.map((block) => {
    if (block.nodeType === 'heading-2') {
      headings.push(block.content[0].value)
    }
  })
  return headings
}

const TableOfContents = ({ headings }) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <Tbody>
          {headings.map((heading, index) => {
            return (
              <Tr>
                <Td>
                  <Text key={index}>{heading}</Text>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

const Post = ({ post }) => {
  const router = useRouter()
  if (!router.isFallback && !post.fields.slug) {
    return <ErrorPage statusCode={404} />
  }
  const headings: string[] = getHeadings(post)
  return (
    <>
      <Flex>
        <Flex flexDir="column" borderLeft="4px solid" borderColor="brand.text" my={8} pl={5}>
          <Heading size="md" textAlign="start">
            {post.fields.title}
          </Heading>
          {dayjs(post.sys.createdAt).format('DD/MM/YYYY')}
        </Flex>
      </Flex>
      {/* <TableOfContents headings={headings}></TableOfContents> */}
      <div>{documentToReactComponents(post.fields.content, renderOptions)}</div>
      <Link href="/posts/1">
        <Button w={40}>View all posts</Button>
      </Link>
    </>
  )
}

export default Post
