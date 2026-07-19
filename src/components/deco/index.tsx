/*
 * Terminal-Industrial decorative motifs — see docs/design-overhaul.md §4.
 * All motifs are decoration: aria-hidden and non-selectable.
 */

// Deterministic small hash so barcodes differ per seed but are stable per build
const hashSeed = (seed: string): number => {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

export const Barcode = ({ seed = 'melon-sour', bars = 32, className = '' }: { seed?: string; bars?: number; className?: string }) => {
  let h = hashSeed(seed)
  const widths: number[] = []
  for (let i = 0; i < bars; i++) {
    h = Math.imul(h ^ (h >>> 15), 2246822519) >>> 0
    widths.push((h % 3) + 1)
  }
  return (
    <span aria-hidden="true" className={`inline-flex items-stretch gap-[2px] h-4 select-none ${className}`}>
      {widths.map((w, i) => (
        <span key={i} className="bg-ink-4" style={{ width: `${w}px` }} />
      ))}
    </span>
  )
}

export const Label = ({ children, variant = 'outline', className = '', style }: { children; variant?: 'accent' | 'outline' | 'ink'; className?: string; style?: React.CSSProperties }) => {
  const variants = {
    accent: 'bg-accent text-accent-ink',
    outline: 'border border-ink-3 text-ink-4',
    ink: 'bg-ink-6 text-ink-0',
  }
  return (
    <span className={`inline-block px-1.5 text-xs font-mono uppercase tracking-widest ${variants[variant]} ${className}`} style={style}>
      {children}
    </span>
  )
}

/*
 * Katakana/kanji annotation layer. Fixed dictionary (doc §4) — always paired
 * with an English label, so hidden from screen readers.
 */
export const Jp = ({ children, className = '' }: { children; className?: string }) => (
  <span aria-hidden="true" className={`text-xs text-ink-4 select-none ${className}`}>
    {children}
  </span>
)

export const Rule = ({ char = '─', className = '' }: { char?: string; className?: string }) => (
  <div
    aria-hidden="true"
    className={`overflow-hidden whitespace-nowrap leading-none text-ink-2 select-none ${className}`}
  >
    {char.repeat(400)}
  </div>
)

export const Telemetry = ({ items, className = '' }: { items?: string[]; className?: string }) => {
  const line = (items ?? ['SYS:OK', 'MELON-SOUR/V2', `BUILD ${new Date().getFullYear()}`]).join(' ▪ ')
  return (
    <span aria-hidden="true" className={`text-xs font-mono text-ink-4 tracking-wider select-none ${className}`}>
      {line}
    </span>
  )
}

export const Frame = ({ title, jp, children, className = '' }: { title: string; jp?: string; children; className?: string }) => (
  <div className={`border border-ink-2 ${className}`}>
    <div className="flex items-center border-b border-ink-2 bg-ink-1 px-3 py-1 gap-2">
      <span aria-hidden="true" className="text-ink-3 text-xs select-none">┌</span>
      <span className="text-xs text-ink-4">{title}</span>
      {jp && <Jp>{jp}</Jp>}
      <span aria-hidden="true" className="flex-1 border-t border-ink-2" />
      <span aria-hidden="true" className="text-ink-3 text-xs select-none">┐</span>
    </div>
    {children}
  </div>
)
