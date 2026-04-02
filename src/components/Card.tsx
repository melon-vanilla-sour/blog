import { BiFolderOpen } from 'react-icons/bi'
import Link from 'next/link'
import dayjs from 'dayjs'
import matter from 'gray-matter'

import { capitalizeString, doNotRender, getImageUrls, getSlugFromTitle } from '../lib/utils'

export const SPECTRUM = [
  '--color-ctp-rosewater', '--color-ctp-flamingo', '--color-ctp-pink',
  '--color-ctp-mauve',     '--color-ctp-red',      '--color-ctp-maroon',
  '--color-ctp-peach',     '--color-ctp-yellow',   '--color-ctp-green',
  '--color-ctp-teal',      '--color-ctp-sky',       '--color-ctp-sapphire',
  '--color-ctp-blue',      '--color-ctp-lavender',
]


export const CardTextContainer = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex flex-col justify-center p-3 gap-1.5 ${className}`} {...props}>
      {children}
    </div>
  )
}

const Card = ({ post, index = 0 }) => {
  const {
    content,
    data: { title = '', slug = '', category = '', tags = [], created },
  } = matter(post)
  const thumbnail = getImageUrls(content) ? getImageUrls(content)[0] : null
  if (doNotRender(slug)) {
    return null
  }
  const accentColor = `var(${SPECTRUM[index % SPECTRUM.length]})`
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
