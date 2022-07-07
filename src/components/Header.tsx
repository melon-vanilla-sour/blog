import { Heading, Flex, Box, Image } from '@chakra-ui/react'
import { useColorMode } from '@chakra-ui/color-mode'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const Header = () => {
  const [currentPage, setCurrentPage] = useState('')
  const router = useRouter()
  const pathName = () => {
    if (router.pathname.includes('posts')) {
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
        <Image src="/melon-sour.ico" w="64px" h="64px"></Image>
        <Heading fontSize="4xl">Melon Sour</Heading>
      </Flex>
      <Flex
        w="350px"
        display={{ base: 'none', sm: 'flex' }}
        justifyContent="space-between"
        paddingX={8}
        className="navigation"
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
      <Box className="underline" border="2.5px solid #444444" bg="#444444"></Box>
    </>
  )
}

export default Header
