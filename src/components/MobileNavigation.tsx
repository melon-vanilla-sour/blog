import { useState } from 'react'
import Link from 'next/link'

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'white',
            zIndex: 100,
          }}
        >
          <nav onClick={() => setIsOpen(false)}>
            <Link href="/about">
              <a style={{ display: 'block', padding: '1.25rem', textAlign: 'center', fontSize: '1.25rem', fontWeight: 600 }}>About</a>
            </Link>
            <Link href="/posts/1">
              <a style={{ display: 'block', padding: '1.25rem', textAlign: 'center', fontSize: '1.25rem', fontWeight: 600 }}>Posts</a>
            </Link>
            <Link href="/projects">
              <a style={{ display: 'block', padding: '1.25rem', textAlign: 'center', fontSize: '1.25rem', fontWeight: 600 }}>Projects</a>
            </Link>
          </nav>
          <button onClick={() => setIsOpen(false)} aria-label="Close Navigation">✕</button>
        </div>
      )}
      <button
        aria-label="Toggle Navigation"
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          border: '1px solid',
          cursor: 'pointer',
        }}
      >
        ☰
      </button>
    </div>
  )
}

export default MobileNavigation
