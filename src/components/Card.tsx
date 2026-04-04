import { BiFolderOpen } from 'react-icons/bi'
import Link from 'next/link'
import dayjs from 'dayjs'
import matter from 'gray-matter'

import { capitalizeString, doNotRender, getImageUrls, getSlugFromTitle } from '../lib/utils'

const SPECTRUM = [
  '--color-ctp-green',     '--color-ctp-red',       '--color-ctp-teal',
  '--color-ctp-peach',     '--color-ctp-blue',      '--color-ctp-yellow',
  '--color-ctp-mauve',     '--color-ctp-flamingo',  '--color-ctp-sky',
  '--color-ctp-maroon',    '--color-ctp-lavender',  '--color-ctp-rosewater',
  '--color-ctp-sapphire',  '--color-ctp-pink',
]

export const buildCategoryColorMap = (posts: { value: string }[]): Record<string, string> => {
  const categories = [...new Set(
    posts.map(p => matter(p.value).data.category ?? '').filter(Boolean)
  )].sort()
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

const Card = ({ post, colorMap = {} }: { post: string, colorMap?: Record<string, string> }) => {
  const {
    content,
    data: { title = '', slug = '', category = '', tags = [], created },
  } = matter(post)
  const thumbnail = getImageUrls(content) ? getImageUrls(content)[0] : null
  if (doNotRender(slug)) {
    return null
  }
  const accentColor = colorMap[category] ?? 'var(--color-ctp-surface1)'
  return (
    <div className="card tab-focus-outline-nested group">
      <Link href={`/post/${slug}`}>
        <a className="flex h-28 no-underline hover:no-underline">
          <div
            className="w-1 shrink-0"
            style={{ backgroundColor: accentColor }}
          />
          <div className="flex flex-[0_0_70%]">
            <div className="hidden sm:flex flex-col items-center justify-center p-3 gap-0.5 min-w-[5.5rem] border-r border-ctp-surface1">
              <span className="text-ctp-yellow font-semibold text-base caretColor-transparent">
                {created && dayjs(created).format('DD/MMM')}
              </span>
              <span className="text-ctp-subtext0 text-sm">
                {created && dayjs(created).format('YYYY')}
              </span>
            </div>
            <CardTextContainer>
              <h2 className="text-ctp-text text-base font-semibold leading-snug line-clamp-2">
                {title}
              </h2>
              <div className="flex items-center gap-1 text-ctp-peach text-sm">
                <BiFolderOpen />
                <span>{category && capitalizeString(category)}</span>
              </div>
            </CardTextContainer>
          </div>

          <div className="flex-1 border-l border-ctp-surface1 overflow-hidden">
            <img
              src={thumbnail ?? '/ogp.png'}
              alt="Post Thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        </a>
      </Link>
    </div>
  )
}

export default Card
