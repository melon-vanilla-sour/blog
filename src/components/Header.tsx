import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useTheme } from '../lib/useTheme'

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
)

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
      <a className={`px-3 py-1.5 text-sm transition-colors no-underline hover:no-underline ${
        currentPage === page
          ? 'text-ink-6 font-semibold underline underline-offset-4'
          : 'text-ink-4 hover:text-ink-6 hover:bg-ink-1'
      }`}>
        {label}
      </a>
    </Link>
  )

  return (
    <header className="mb-6">
      <div className="flex items-center py-2 gap-3">
        <img src="/melon-sour.png" width="32" height="32" alt="Melon Sour" />
        <span className="display-heading text-2xl leading-none">MELON SOUR</span>
        <nav className="ml-auto hidden sm:flex items-center gap-1">
          {navLink('/about', 'About', 'about')}
          {navLink('/posts/1', 'Posts', 'posts')}
          {navLink('/projects', 'Projects', 'projects')}
          <button
            onClick={toggle}
            className="ml-1 p-1.5 text-ink-4 hover:text-ink-6 hover:bg-ink-1 transition-colors tab-focus-outline"
            aria-label="Toggle light/dark mode"
          >
            {isLight ? <MoonIcon /> : <SunIcon />}
          </button>
        </nav>
      </div>
      <div className="border-b border-ink-2" />
    </header>
  )
}

export default Header
