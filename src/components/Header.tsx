import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useTheme } from '../lib/useTheme'
import { Jp } from './deco'

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
      <a className={`px-3 py-1 text-sm uppercase tracking-widest transition-colors no-underline hover:no-underline ${
        currentPage === page
          ? 'bg-accent text-accent-ink font-semibold'
          : 'text-ink-4 hover:text-ink-6'
      }`}>
        {label}
      </a>
    </Link>
  )

  return (
    <header className="mb-6">
      <div className="flex items-center py-2 gap-3">
        <img src="/melon-sour.png" width="32" height="32" alt="Melon Sour" />
        <div className="flex flex-col">
          <span className="display-heading text-2xl leading-none">MELON SOUR</span>
          <span className="flex gap-2 items-baseline">
            <Jp>メロンサワー</Jp>
            <span aria-hidden="true" className="text-[10px] text-ink-3 tracking-widest select-none">V2.0</span>
          </span>
        </div>
        <nav className="ml-auto hidden sm:flex items-center">
          {navLink('/about', 'About', 'about')}
          <span className="text-ink-3 select-none" aria-hidden="true">│</span>
          {navLink('/posts/1', 'Posts', 'posts')}
          <span className="text-ink-3 select-none" aria-hidden="true">│</span>
          {navLink('/projects', 'Projects', 'projects')}
          <span className="text-ink-3 select-none" aria-hidden="true">│</span>
          <button
            onClick={toggle}
            className="px-3 py-1 text-xs text-ink-4 hover:text-ink-6 tracking-widest transition-colors tab-focus-outline"
            aria-label="Toggle light/dark mode"
          >
            {isLight ? '[DARK]' : '[LIGHT]'}
          </button>
        </nav>
      </div>
      <div className="border-b border-ink-2" />
    </header>
  )
}

export default Header
