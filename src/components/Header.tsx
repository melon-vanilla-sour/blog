import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Heading,
  Flex,
  Box,
  Image,
  IconButton,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const PageHeading = (props) => {
  return <Heading size="sm" cursor="pointer" {...props}></Heading>
}

const Header = () => {
  const [currentPage, setCurrentPage] = useState('')
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
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
      <Flex margin="0 auto" alignItems="center" my={2}>
        <Image src="/melon-sour.ico" w="64px" h="64px" mr={4}></Image>
        <Heading fontSize={{ base: '3xl', sm: '4xl' }}>Melon Sour</Heading>
        <Flex dir="row" alignItems="center" ml={20} gap={4} display={{ base: 'none', sm: 'flex' }}>
          <Link href="/about">
            <a>
              <PageHeading fontWeight={currentPage == 'about' ? 'semibold' : 'regular'}>
                About
              </PageHeading>
            </a>
          </Link>
          <Link href="/posts/1">
            <a>
              <PageHeading fontWeight={currentPage == 'posts' ? 'semibold' : 'regular'}>
                Posts
              </PageHeading>
            </a>
          </Link>
          <Link href="/projects">
            <a>
              <PageHeading fontWeight={currentPage == 'projects' ? 'semibold' : 'regular'}>
                Projects
              </PageHeading>
            </a>
          </Link>
          <IconButton
            aria-label="Toggle Mode"
            onClick={toggleColorMode}
            boxShadow="none"
            my={2}
            ml={4}
          >
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </IconButton>
        </Flex>
      </Flex>
      <Box
        className="underline"
        border="2.5px solid"
        borderColor={useColorModeValue('brand.text', 'white')}
        bg={useColorModeValue('brand.text', 'white')}
      ></Box>
    </>
  )
}

export default Header
