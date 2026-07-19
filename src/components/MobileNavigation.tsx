import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from '../lib/useTheme'
import { Jp } from './deco'

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isLight, toggle } = useTheme()

  const navLink = (href: string, label: string, jp: string) => (
    <Link href={href}>
      <a className="flex items-baseline justify-between px-6 py-4 text-ink-4 hover:text-ink-6 hover:bg-ink-1 border-b border-ink-2 text-sm uppercase tracking-widest transition-colors no-underline hover:no-underline">
        {label}
        <Jp>{jp}</Jp>
      </a>
    </Link>
  )

  return (
    <div className="sm:hidden">
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-ink-0/80 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-3/5 bg-ink-1 border-l border-ink-2 z-50 flex flex-col">
            <nav className="flex flex-col flex-1 justify-center" onClick={() => setIsOpen(false)}>
              {navLink('/about', 'About', '自己紹介')}
              {navLink('/posts/1', 'Posts', '投稿')}
              {navLink('/projects', 'Projects', '案件')}
            </nav>
            <button
              onClick={toggle}
              className="px-6 py-3 text-ink-4 hover:text-ink-6 text-xs tracking-widest border-t border-ink-2 transition-colors text-left"
              aria-label="Toggle light/dark mode"
            >
              {isLight ? '[DARK MODE]' : '[LIGHT MODE]'}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-4 text-ink-4 hover:text-ink-6 text-xs tracking-widest border-t border-ink-2 transition-colors"
              aria-label="Close Navigation"
            >
              [ ✕ CLOSE ]
            </button>
          </div>
        </>
      )}
      <button
        aria-label="Toggle Navigation"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-10 h-10 border border-ink-2 bg-ink-1 text-ink-4 hover:text-ink-6 hover:border-ink-3 transition-colors text-lg"
      >
        ☰
      </button>
    </div>
  )
}

export default MobileNavigation
