import { useRouter } from 'next/router'
import Link from 'next/link'
import ErrorPage from 'next/error'
import Image from 'next/image'

import ReactMarkdown from 'react-markdown'
import remarkUnwrapImages from 'remark-unwrap-images'
import matter from 'gray-matter'

import { buildClient } from '../../lib/contentful'
import { capitalizeString, getImageUrls, isInternalLink } from '../../lib/utils'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { getPlaiceholder } from 'plaiceholder'

import {
  Heading,
  Box,
  Text,
  Button,
  Flex,
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

const client = buildClient()

const getPostEntries = async () => {
  const { items } = await client.getEntries({
    content_type: 'markdownPost',
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

  // @ts-ignore
  const imageURLs = getImageUrls(post.fields.body)
  if (imageURLs) {
    await Promise.all(
      imageURLs.map(async (imageURL, index) => {
        const { base64, img } = await getPlaiceholder(`https:${imageURL}`)
        plaiceholders[index] = { ...img, blurDataURL: base64 }
      })
    )
  }
  return {
    props: {
      post: post,
      plaiceholders: plaiceholders,
    },
  }
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
  let imageIndex = 0
  const markdownRenderer = {
    p: ({ children, ...props }) => (
      <Text pb={8} fontSize="md" {...props}>
        {children}
      </Text>
    ),
    h2: ({ node, ...props }) => <Heading size="md" mb={8} textAlign="start" {...props} />,
    a: ({ node, href, ...props }) => {
      return (
        <ChakraLink
          color={useColorModeValue('blue.500', 'blue.300')}
          fontWeight="semibold"
          target={isInternalLink(href) ? '_self' : '_blank'}
          href={href}
          {...props}
        ></ChakraLink>
      )
    },
    ul: ({ children, ...props }) => (
      <Box pb={8} fontSize="md" {...props}>
        {children}
      </Box>
    ),
    img: ({ node, src, ...props }) => {
      let { src: imgSrc, ...imageProps } = plaiceholders[imageIndex]
      imageIndex += 1
      return (
        <Flex
          filter={'saturate(110%) brightness(110%)'}
          justifyContent="center"
          borderRadius="10px"
          overflow="hidden"
          mb={8}
        >
          <Image
            src={`${imgSrc}?fm=webp&h=600`}
            {...imageProps}
            priority={true}
            placeholder="blur"
            {...props}
          />
        </Flex>
      )
    },
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <Box pb={8} borderRadius={10} overflow="hidden">
          <SyntaxHighlighter
            {...props}
            children={String(children).replace(/\n$/, '')}
            style={useColorModeValue(oneDark, oneDark)}
            language={match[1]}
            PreTag="div"
          />
        </Box>
      ) : (
        <Box
          px={1}
          bg={useColorModeValue('blackAlpha.300', 'gray.700')}
          {...props}
          className={className}
          as="code"
        >
          {children}
        </Box>
      )
    },
  }

  const {
    content,
    data: { title = '', category = '', tags = [], created },
  } = matter(post.fields.body)
  return (
    <>
      <Flex>
        <Flex flexDir="column" borderLeft="4px solid" borderColor="brand.text" my={8} pl={5}>
          <Heading size="md" textAlign="start" mb={1}>
            {post.fields.title || title}
          </Heading>
          <HStack>
            <Icon as={BiFolderOpen} />
            <Text>{capitalizeString(post.fields.category || category)}</Text>
            <Icon as={TbWriting} />
            <Text>{dayjs(post.fields.created || created).format('DD/MM/YYYY')}</Text>
          </HStack>
          <HStack>
            <Icon as={AiOutlineTag} />
            <Text>{(post.fields.tags || tags).join(', ')}</Text>
          </HStack>
        </Flex>
      </Flex>
      {/* 
      // @ts-ignore */}
      <ReactMarkdown components={markdownRenderer} remarkPlugins={[remarkUnwrapImages]} skipHtml>
        {content}
      </ReactMarkdown>
      <Link href="/posts/1">
        <Button w={40}>View all posts</Button>
      </Link>
    </>
  )
}
export default Post
