import { useRouter } from 'next/router'
import Link from 'next/link'
import ErrorPage from 'next/error'

import remarkUnwrapImages from 'remark-unwrap-images'
import matter from 'gray-matter'

import { capitalizeString, getImageUrls, getSlugFromTitle, isInternalLink } from '../../lib/utils'
import { fetchMarkdownFiles, fetchMarkdownContent } from '../../lib/remoteMd'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

import {
  Heading,
  Box,
  Text,
  Button,
  Flex,
  useColorModeValue,
  Link as ChakraLink,
  HStack,
  Icon,
  Image
} from '@chakra-ui/react'
import { TbWriting } from 'react-icons/tb'
import { BiFolderOpen } from 'react-icons/bi'
import { AiOutlineTag } from 'react-icons/ai'
import dayjs from 'dayjs'

export const getStaticPaths = async () => {
  const markdownFiles = await fetchMarkdownFiles()
  const posts = await fetchMarkdownContent(markdownFiles)

  const paths = posts.map((post) => {
    const {
      content,
      data: { title = '', category = '', tags = [], created },
      // @ts-ignore
    } = matter(post.value)
    const slug = getSlugFromTitle(title)
    return {
      params: { slug: slug }
    }
  })
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const markdownFiles = await fetchMarkdownFiles()
  const posts = await fetchMarkdownContent(markdownFiles)
  const post = posts.find((post) => {
    const {
      content,
      data: { title = '', category = '', tags = [], created },
      // @ts-ignore
    } = matter(post.value)
    const slug = getSlugFromTitle(title)
    return slug == params.slug
  })

  const {
    content,
    data: { title = '', category = '', tags = [], created },
    // @ts-ignore
  } = matter(post.value)
  const slug = getSlugFromTitle(title)
  const markdownSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkUnwrapImages]
    }
  })
  const createdString = dayjs(created).format('DD/MM/YYYY')

  return {
    props: {
      post: markdownSource,
      slug: slug,
      title: title,
      category: category,
      tags: tags,
      created: createdString,
      // plaiceholders: plaiceholders,
    },
  }
}

const Post = ({ post, slug, title, category, tags, created }) => {
  const router = useRouter()
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  const components = {
    h2: (props) => <Heading size="md" mb={8} textAlign="start" {...props} />,
    p: ({ children, ...props }) => (
      <Text pb={8} fontSize="md" {...props}>
        {children}
      </Text>
    ),
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
    ol: ({ children, ...props }) => (
      <Box pb={8} fontSize="md" {...props}>
        {children}
      </Box>
    ),
    img: ({ node, src, ...props }) => {
      return (
        <Flex
          filter={'saturate(110%) brightness(110%)'}
          justifyContent="center"
          borderRadius="10px"
          overflow="hidden"
          maxHeight="600px"
          mb={8}
        >
          <Image
            src={src}
            {...props}
            style={{ borderRadius: '10px' }}
            objectFit="contain"
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

  return (
    <>
      <Flex>
        <Flex flexDir="column" borderLeft="4px solid" borderColor="brand.text" my={8} pl={5}>
          {title && (<Heading size="md" textAlign="start" mb={1}>
            {title}
          </Heading>)}
          <HStack>
            <Icon as={BiFolderOpen} />
            {category && <Text>{capitalizeString(category)}</Text>}
            <Icon as={TbWriting} />
            {created && (<Text>{created}</Text>)}
          </HStack>
          <HStack>
            <Icon as={AiOutlineTag} />
            {tags && <Text>{(tags).join(', ')}</Text>}
          </HStack>
        </Flex>
      </Flex>
      <Box fontFamily='Merriweather'>
        <MDXRemote {...post} components={components} />
      </Box>
      <Link href="/posts/1">
        <Button w={40}>View all posts</Button>
      </Link>
    </>
  )
}
export default Post
