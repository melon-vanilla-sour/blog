import { useRouter } from 'next/router'
import Link from 'next/link'
import ErrorPage from 'next/error'

import remarkUnwrapImages from 'remark-unwrap-images'
import matter from 'gray-matter'

import { capitalizeString, filterDraftPosts, getImageUrls, isInternalLink } from '../../lib/utils'
import { fetchMarkdownFiles, fetchMarkdownContent, getCachedContent } from '../../lib/remoteMd'

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
  Image,
  ListItem,
  List,
  VStack,
} from '@chakra-ui/react'
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
      remarkPlugins: [remarkUnwrapImages],
    },
  })
  const createdString = dayjs(created).format('DD/MM/YYYY')

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
      // plaiceholders: plaiceholders,
    },
  }
}

const Post = ({ toc, post, slug, title, category, tags, created }) => {
  const router = useRouter()
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />
  }

  const components = {
    h2: ({ children, ...props }) => (
      <Heading size="md" id={children} mb={{ base: '4', sm: '6' }} textAlign="start" {...props}>
        {children}
      </Heading>
    ),
    h3: (props) => <Heading size="sm" mb={{ base: '4', sm: '6' }} textAlign="start" {...props} />,
    p: ({ children, ...props }) => (
      <Text pb={{ base: '4', sm: '6' }} fontSize="md" {...props}>
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
      <List pb={{ base: '4', sm: '6' }} pl={4} fontSize="md" styleType="disc" {...props}>
        {children}
      </List>
    ),
    li: ({ children, ...props }) => (
      <ListItem mb={2} {...props}>
        {children}
      </ListItem>
    ),
    ol: ({ children, ...props }) => (
      <List pb={{ base: '4', sm: '6' }} pl={4} fontSize="md" styleType="disc" {...props}>
        {children}
      </List>
    ),
    img: ({ node, src, ...props }) => {
      return (
        <Flex filter={'saturate(110%) brightness(110%)'}>
          <Image
            src={src}
            style={{ borderRadius: '10px' }}
            objectFit="contain"
            maxH="600px"
            mb={{ base: '4', sm: '6' }}
            mx="auto"
          />
        </Flex>
      )
    },
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <Box pb={{ base: '4', sm: '6' }} borderRadius={10} overflow="hidden">
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
        <Flex
          flexDir="column"
          borderLeft="4px solid"
          borderColor="brand.text"
          my={{ base: '4', sm: '6' }}
          pl={4}
        >
          {title && (
            <Heading size="md" textAlign="start" mb={1}>
              {title}
            </Heading>
          )}
          <HStack>
            <Icon as={BiFolderOpen} />
            {category && <Text>{capitalizeString(category)}</Text>}
            <Icon as={TbWriting} />
            {created && <Text>{created}</Text>}
          </HStack>
          <HStack>
            <Icon as={AiOutlineTag} />
            {tags && <Text>{tags.join(', ')}</Text>}
          </HStack>
        </Flex>
      </Flex>
      {toc.length > 0 && (
        <Flex
          flexDir="column"
          mb={4}
          border="2px solid"
          borderColor={useColorModeValue('blackAlpha.400', 'whiteAlpha.400')}
          borderRadius={8}
          py={4}
          px={6}
          width="fit-content"
        >
          <Heading size="md" mb={2} textAlign="start">
            Table of Contents
          </Heading>
          <List fontSize="md">
            {toc.map((h2) => {
              return (
                <ListItem textDecoration="underline" mb={2}>
                  <Link href={`#${h2}`}>{h2}</Link>
                </ListItem>
              )
            })}
          </List>
        </Flex>
      )}
      <Box fontFamily="Open Sans Variable">
        <MDXRemote {...post} components={components} />
      </Box>
      <Link href="/posts/1">
        <Button w={40}>View all posts</Button>
      </Link>
    </>
  )
}
export default Post
