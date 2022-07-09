import { Heading, Flex, Box, Image } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const Header = () => {
  const [currentPage, setCurrentPage] = useState('')
  const router = useRouter()
  const pathName = () => {
    if (router.pathname.includes('post')) {
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
          <Heading
            fontSize="md"
            cursor="pointer"
            fontWeight={currentPage == 'about' ? 'bold' : 'regular'}
          >
            About
          </Heading>
        </Link>
        <Link href="/posts/1">
          <Heading
            fontSize="md"
            cursor="pointer"
            fontWeight={currentPage == 'posts' ? 'bold' : 'regular'}
          >
            Posts
          </Heading>
        </Link>
        <Link href="/projects">
          <Heading
            fontSize="md"
            cursor="pointer"
            fontWeight={currentPage == 'projects' ? 'bold' : 'regular'}
          >
            Projects
          </Heading>
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
