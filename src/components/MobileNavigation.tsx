import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from '../lib/useTheme'
import { Jp } from './deco'

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('')
  const { isLight, toggle } = useTheme()
  const router = useRouter()
  const sheetRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (
      router.pathname.includes('post') ||
      router.pathname.includes('categories') ||
      router.pathname.includes('tags')
    ) {
      setCurrentPage('posts')
    } else if (router.pathname.includes('projects')) {
      setCurrentPage('projects')
    } else {
      setCurrentPage('about')
    }
  }, [router])

  // Scroll lock + Escape + focus trap while the sheet is open
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'

    const firstLink = sheetRef.current?.querySelector<HTMLElement>('a, button')
    firstLink?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        return
      }
      if (e.key === 'Tab' && sheetRef.current && buttonRef.current) {
        const focusables = [
          ...Array.from(sheetRef.current.querySelectorAll<HTMLElement>('a, button')),
          buttonRef.current,
        ]
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      buttonRef.current?.focus()
    }
  }, [isOpen])

  const navLink = (href: string, label: string, jp: string, page: string) => (
    <Link href={href}>
      <a
        onClick={() => setIsOpen(false)}
        className={`flex items-baseline justify-between px-6 py-4 border-b border-ink-2 text-sm uppercase tracking-widest transition-colors no-underline hover:no-underline ${
          currentPage === page
            ? 'bg-accent text-accent-ink font-semibold'
            : 'text-ink-4 hover:text-ink-6 hover:bg-ink-1'
        }`}
      >
        {label}
        <Jp>{jp}</Jp>
      </a>
    </Link>
  )

  return (
    <div className="sm:hidden">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-ink-0/70 z-40 transition-[opacity,visibility] duration-200 motion-reduce:transition-none ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
      />

      {/* Bottom sheet */}
      <div
        id="mobile-nav-sheet"
        ref={sheetRef}
        aria-hidden={!isOpen}
        className={`fixed inset-x-0 bottom-0 z-50 bg-ink-0 border-t border-ink-2 transition-[transform,visibility] duration-200 motion-reduce:transition-none ${
          isOpen ? 'visible translate-y-0' : 'invisible translate-y-full'
        }`}
      >
        <div className="flex items-center px-4 py-1.5 border-b border-ink-2 bg-ink-1 gap-2">
          <span aria-hidden="true" className="text-ink-3 text-xs select-none">┌</span>
          <span className="text-xs text-ink-4 uppercase tracking-widest">Nav</span>
          <Jp>／ メニュー</Jp>
          <span aria-hidden="true" className="flex-1 border-t border-ink-2" />
          <span aria-hidden="true" className="text-ink-3 text-xs select-none">┐</span>
        </div>
        <nav>
          {navLink('/about', 'About', '自己紹介', 'about')}
          {navLink('/posts/1', 'Posts', '投稿', 'posts')}
          {navLink('/projects', 'Projects', '案件', 'projects')}
        </nav>
        <button
          onClick={toggle}
          className="w-full px-6 py-4 text-ink-4 hover:text-ink-6 text-xs tracking-widest transition-colors text-left"
          aria-label="Toggle light/dark mode"
        >
          {isLight ? '[DARK MODE]' : '[LIGHT MODE]'}
        </button>
        {/* Clearance so the floating toggle never overlaps the last row */}
        <div style={{ height: 'calc(3.5rem + env(safe-area-inset-bottom))' }} aria-hidden="true" />
      </div>

      {/* Floating toggle — morphs into the close control while open */}
      <button
        ref={buttonRef}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-sheet"
        onClick={() => setIsOpen(!isOpen)}
        style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
        className="fixed right-4 z-[60] h-12 px-4 border border-ink-2 bg-ink-0 text-ink-4 hover:text-ink-6 hover:border-ink-3 transition-colors text-xs tracking-widest tab-focus-outline"
      >
        {isOpen ? '[ ✕ ]' : '[MENU]'}
      </button>
    </div>
  )
}

export default MobileNavigation
