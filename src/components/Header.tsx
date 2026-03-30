import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

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
      <div>
        <img src="/melon-sour.ico" width="64" height="64" alt="Melon Sour logo" />
        <h1>MELON SOUR</h1>
        <nav>
          <Link href="/about">
            <a style={{ textDecoration: currentPage === 'about' ? 'underline' : 'none' }}>About</a>
          </Link>
          <Link href="/posts/1">
            <a style={{ textDecoration: currentPage === 'posts' ? 'underline' : 'none' }}>Posts</a>
          </Link>
          <Link href="/projects">
            <a style={{ textDecoration: currentPage === 'projects' ? 'underline' : 'none' }}>Projects</a>
          </Link>
        </nav>
      </div>
      <hr />
    </>
  )
}

export default Header
