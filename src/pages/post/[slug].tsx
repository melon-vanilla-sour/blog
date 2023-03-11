import { useRouter } from 'next/router'
import Link from 'next/link'
import ErrorPage from 'next/error'
import Image from 'next/image'

import { buildClient } from '../../lib/contentful'
import { capitalizeString } from '../../lib/utils'
import { EntryCollection } from 'contentful'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDarkReasonable } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

import { getPlaiceholder } from 'plaiceholder'

import {
  Heading,
  Box,
  Text,
  Button,
  Flex,
  // Image,
  useColorModeValue,
  Link as ChakraLink,
  TableContainer,
  Tbody,
  Table,
  Td,
  Tr,
  HStack,
  Icon,
} from '@chakra-ui/react'
import { TbWriting } from 'react-icons/tb'
import { BiFolderOpen } from 'react-icons/bi'
import { AiOutlineTag } from 'react-icons/ai'
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
  const plaiceholders = {}
  await Promise.all(
    // @ts-ignore
    post.fields.content.content.map(async (content) => {
      if (content.nodeType == 'embedded-asset-block') {
        const { base64, img } = await getPlaiceholder(
          'https://' + content.data.target.fields.file.url
        )
        plaiceholders[content.data.target.sys.id] = { ...img, blurDataURL: base64 }
      }
    })
  )
  return {
    props: {
      post: post,
      plaiceholders: plaiceholders,
    },
  }
}

const renderOptions = (plaiceholders) => {
  return {
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
            <Box mb={8}>
              <Card post={node.data.target} index={1}></Card>
            </Box>
          )
        }
      },

      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        let { src, ...imageProps } = plaiceholders[node.data.target.sys.id]
        // for some reason an extra // is appended to the image url
        src = src.replace('//', '')
        const imageWidth = node.data.target.fields.file.details.image.width
        const imageHeight = node.data.target.fields.file.details.image.height
        const maxHeight = '600px'
        return (
          <Flex
            mb={8}
            filter={'saturate(110%) brightness(110%)'}
            justifyContent="center"
            borderRadius="10px"
            overflow="hidden"
          >
            <Image {...imageProps} src={src} placeholder="blur" priority="true" />

            {/* <Image
              src={`https:${node.data.target.fields.file.url}?fm=webp&h=600`}
              maxH={{ base: '350px', sm: `${maxHeight}` }}
              borderRadius="10px" */}
            {/* // border="2px solid" // borderColor={useColorModeValue('gray.700', 'gray.300')} */}
            {/* /> */}
          </Flex>
        )
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        if (node.content.length === 1 && node.content[0].marks.find((x) => x.type === 'code')) {
          return <Box pb={8}>{children} </Box>
        }

        return (
          <Text pb={8} fontSize="md">
            {children}
          </Text>
        )
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return (
          <Heading size="md" mb={8} textAlign="start">
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
        console.log(text)
        if (text.length != 1) {
          // Parse first line as language then delete it
          const language = text.shift()
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
        } else {
          return (
            <Box px={1} bg={useColorModeValue('blackAlpha.300', 'gray.700')} as="code">
              {text}
            </Box>
          )
        }
      },
    },
  }
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

const Post = ({ post, plaiceholders }) => {
  const router = useRouter()
  if (!router.isFallback && !post.fields.slug) {
    return <ErrorPage statusCode={404} />
  }
  const headings: string[] = getHeadings(post)
  const tags = post.fields.tags || []
  return (
    <>
      <Flex>
        <Flex flexDir="column" borderLeft="4px solid" borderColor="brand.text" my={8} pl={5}>
          <Heading size="md" textAlign="start" mb={1}>
            {post.fields.title}
          </Heading>
          <HStack>
            <Icon as={BiFolderOpen} />
            <Text>{capitalizeString(post.fields.category)}</Text>
            <Icon as={TbWriting} />
            <Text>{dayjs(post.sys.createdAt).format('DD/MM/YYYY')}</Text>
          </HStack>
          <HStack>
            <Icon as={AiOutlineTag} />
            <Text>{tags.join(', ')}</Text>
          </HStack>
        </Flex>
      </Flex>
      {/* <TableOfContents headings={headings}></TableOfContents> */}
      <div>{documentToReactComponents(post.fields.content, renderOptions(plaiceholders))}</div>
      <Link href="/posts/1">
        <Button w={40}>View all posts</Button>
      </Link>
    </>
  )
}

export default Post
