import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from '../lib/useTheme'

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isLight, toggle } = useTheme()

  return (
    <div className="sm:hidden">
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-ctp-crust/70 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-1/2 bg-ctp-surface0 border-l border-ctp-surface1 z-50 flex flex-col">
            <nav className="flex flex-col flex-1 pt-8" onClick={() => setIsOpen(false)}>
              <Link href="/about">
                <a className="block px-6 py-4 text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface1 border-b border-ctp-surface1 text-sm transition-colors">
                  About
                </a>
              </Link>
              <Link href="/posts/1">
                <a className="block px-6 py-4 text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface1 border-b border-ctp-surface1 text-sm transition-colors">
                  Posts
                </a>
              </Link>
              <Link href="/projects">
                <a className="block px-6 py-4 text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface1 border-b border-ctp-surface1 text-sm transition-colors">
                  Projects
                </a>
              </Link>
            </nav>
            <button
              onClick={toggle}
              className="px-6 py-3 text-ctp-subtext0 hover:text-ctp-text text-sm border-t border-ctp-surface1 transition-colors text-left"
              aria-label="Toggle light/dark mode"
            >
              {isLight ? '☾ dark mode' : '☀ light mode'}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-4 text-ctp-subtext0 hover:text-ctp-text text-sm border-t border-ctp-surface1 transition-colors"
              aria-label="Close Navigation"
            >
              [ ✕ close ]
            </button>
          </div>
        </>
      )}
      <button
        aria-label="Toggle Navigation"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-10 h-10 border border-ctp-surface1 bg-ctp-surface0 text-ctp-subtext0 hover:text-ctp-text hover:border-ctp-overlay0 transition-colors text-lg"
      >
        ☰
      </button>
    </div>
  )
}

export default MobileNavigation
