import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
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

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

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

  const navLink = (href: string, label: string, page: string) => (
    <Link href={href}>
      <a
        onClick={() => setIsOpen(false)}
        className={`flex items-center px-6 py-4 border-b border-ink-2 text-base transition-colors no-underline hover:no-underline ${
          currentPage === page
            ? 'bg-ink-1 text-ink-6 font-semibold'
            : 'text-ink-4 hover:text-ink-6 hover:bg-ink-1'
        }`}
      >
        {label}
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
        <div aria-hidden="true" className="flex justify-center pt-2.5 pb-1.5">
          <span className="h-1 w-10 bg-ink-3" />
        </div>
        <nav>
          {navLink('/about', 'About', 'about')}
          {navLink('/posts/1', 'Posts', 'posts')}
          {navLink('/projects', 'Projects', 'projects')}
        </nav>
        <button
          onClick={toggle}
          className="w-full flex items-center gap-2 px-6 py-4 text-ink-4 hover:text-ink-6 text-base transition-colors text-left"
        >
          {isLight ? <MoonIcon /> : <SunIcon />}
          {isLight ? 'Dark mode' : 'Light mode'}
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
        className="fixed right-4 z-[60] w-12 h-12 flex items-center justify-center border border-ink-2 bg-ink-0 text-ink-4 hover:text-ink-6 hover:border-ink-3 transition-colors tab-focus-outline"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
    </div>
  )
}

export default MobileNavigation
