import { Heading, Flex, Box, Image, chakra } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const PageHeading = (props) => {
  return <Heading size="sm" cursor="pointer" {...props}></Heading>
}

const Header = () => {
  const [currentPage, setCurrentPage] = useState('')
  const router = useRouter()
  const pathName = () => {
    if (
      router.pathname.includes('post') ||
      router.pathname.includes('categories') ||
      router.pathname.includes('tags')
    ) {
      return 'posts'
    }
    if (router.pathname.includes('projects')) {
      return 'projects'
    }
    return 'about'
  }
  useEffect(() => {
    setCurrentPage(pathName())
  }, [router])

  return (
    <>
      <Flex margin="0 auto">
        <Image src="/melon-sour.ico" w="64px" h="64px" mr={4}></Image>
        <Heading fontSize={{ base: '3xl', sm: '4xl' }}>Melon Sour</Heading>
      </Flex>
      <Flex
        w={{ base: '300px', sm: '350px' }}
        justifyContent="space-between"
        px={8}
        mx="auto"
        my={5}
      >
        <Link href="/">
          <PageHeading fontWeight={currentPage == 'about' ? 'bold' : 'regular'}>About</PageHeading>
        </Link>
        <Link href="/posts/1">
          <PageHeading fontWeight={currentPage == 'posts' ? 'bold' : 'regular'}>Posts</PageHeading>
        </Link>
        <Link href="/projects">
          <PageHeading fontWeight={currentPage == 'projects' ? 'bold' : 'regular'}>
            Projects
          </PageHeading>
        </Link>
      </Flex>
      <Box
        className="underline"
        border="2.5px solid"
        borderColor="brand.text"
        bg="brand.text"
      ></Box>
    </>
  )
}

export default Header
