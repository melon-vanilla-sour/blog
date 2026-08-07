/*
 * Minimal-editorial decorative helpers — see docs/design-papermod.md.
 */

export const Tag = ({ children, variant = 'outline', className = '', style }: { children; variant?: 'outline' | 'solid'; className?: string; style?: React.CSSProperties }) => {
  const variants = {
    outline: 'border border-ink-3 text-ink-4',
    solid: 'bg-ink-6 text-ink-0',
  }
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${variants[variant]} ${className}`} style={style}>
      {children}
    </span>
  )
}

export const Rule = ({ className = '' }: { className?: string }) => (
  <hr aria-hidden="true" className={`border-t border-ink-2 ${className}`} />
)
