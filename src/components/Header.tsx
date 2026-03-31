import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useTheme } from '../lib/useTheme'

const Header = () => {
  const [currentPage, setCurrentPage] = useState('')
  const router = useRouter()
  const { isLight, toggle } = useTheme()

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

  const navLink = (href: string, label: string, page: string) => (
    <Link href={href}>
      <a className={`px-3 py-1 text-base transition-colors ${
        currentPage === page
          ? 'text-ctp-lavender'
          : 'text-ctp-subtext0 hover:text-ctp-text'
      }`}>
        {label}
      </a>
    </Link>
  )

  return (
    <header className="mb-6">
      <div className="flex items-center py-2 gap-3">
        <img src="/melon-sour.ico" width="32" height="32" alt="Melon Sour" />
        <span className="text-2xl font-bold tracking-tight text-ctp-text">MELON SOUR</span>
        <nav className="ml-auto hidden sm:flex items-center">
          {navLink('/about', 'About', 'about')}
          <span className="text-ctp-surface2 select-none">│</span>
          {navLink('/posts/1', 'Posts', 'posts')}
          <span className="text-ctp-surface2 select-none">│</span>
          {navLink('/projects', 'Projects', 'projects')}
          <span className="text-ctp-surface2 select-none">│</span>
          <button
            onClick={toggle}
            className="px-3 py-1 text-sm text-ctp-subtext0 hover:text-ctp-text transition-colors tab-focus-outline"
            aria-label="Toggle light/dark mode"
          >
            {isLight ? '☾' : '☀'}
          </button>
        </nav>
      </div>
      <div className="border-b border-ctp-surface1" />
    </header>
  )
}

export default Header
