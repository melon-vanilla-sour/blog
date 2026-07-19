import Link from 'next/link'
import dayjs from 'dayjs'
import matter from 'gray-matter'

import { capitalizeString, doNotRender, getImageUrls, getSlugFromTitle } from '../lib/utils'
import { Label } from './deco'

/*
 * Catppuccin spectrum highlight layer: each category gets a stable accent
 * color, applied only to small label text/borders (doc §7 2026-07-19).
 */
const SPECTRUM = [
  '--color-ctp-green',     '--color-ctp-red',       '--color-ctp-teal',
  '--color-ctp-peach',     '--color-ctp-blue',      '--color-ctp-yellow',
  '--color-ctp-mauve',     '--color-ctp-flamingo',  '--color-ctp-sky',
  '--color-ctp-maroon',    '--color-ctp-lavender',  '--color-ctp-rosewater',
  '--color-ctp-sapphire',  '--color-ctp-pink',
]

export const buildCategoryColorMap = (posts: { value: string }[]): Record<string, string> => {
  const categories = Array.from(new Set(
    posts.map(p => matter(p.value).data.category ?? '').filter(Boolean)
  )).sort()
  return Object.fromEntries(
    categories.map((cat, i) => [cat, `var(${SPECTRUM[i % SPECTRUM.length]})`])
  )
}

export const CardTextContainer = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex flex-col justify-center p-3 gap-1.5 ${className}`} {...props}>
      {children}
    </div>
  )
}

const Card = ({ post, colorMap = {} }: { post: string; colorMap?: Record<string, string> }) => {
  const {
    content,
    data: { title = '', slug = '', category = '', tags = [], created },
  } = matter(post)
  const thumbnail = getImageUrls(content) ? getImageUrls(content)[0] : null
  if (doNotRender(slug)) {
    return null
  }
  return (
    <div className="card tab-focus-outline-nested group">
      <Link href={`/post/${slug}`}>
        <a className="flex h-28 no-underline hover:no-underline">
          <div className="flex flex-[0_0_70%]">
            <div className="hidden sm:flex flex-col items-center justify-center p-3 gap-0.5 min-w-[5.5rem] border-r border-ink-2">
              <span className="text-ink-6 font-semibold text-base uppercase">
                {created && dayjs(created).format('DD MMM')}
              </span>
              <span className="text-ink-4 text-sm">
                {created && dayjs(created).format('YYYY')}
              </span>
            </div>
            <CardTextContainer>
              <h2 className="text-ink-6 text-base font-semibold leading-snug line-clamp-2">
                {title}
              </h2>
              <div>
                {category && (
                  <Label style={colorMap[category] ? { color: colorMap[category], borderColor: colorMap[category] } : undefined}>
                    {capitalizeString(category)}
                  </Label>
                )}
              </div>
            </CardTextContainer>
          </div>

          <div className="flex-1 border-l border-ink-2 overflow-hidden">
            <img
              src={thumbnail ?? '/ogp.png'}
              alt="Post Thumbnail"
              className="w-full h-full object-cover brightness-90 saturate-[1.1]"
            />
          </div>
        </a>
      </Link>
    </div>
  )
}

export default Card
