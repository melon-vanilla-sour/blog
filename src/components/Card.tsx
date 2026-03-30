import { BiFolderOpen } from 'react-icons/bi'
import Link from 'next/link'
import dayjs from 'dayjs'
import matter from 'gray-matter'

import { capitalizeString, doNotRender, getImageUrls, getSlugFromTitle } from '../lib/utils'

export const CardTextContainer = ({ children, ...props }) => {
  return (
    <div {...props}>
      {children}
    </div>
  )
}

const Card = ({ post }) => {
  const {
    content,
    data: { title = '', slug = '', category = '', tags = [], created },
  } = matter(post)
  const thumbnail = getImageUrls(content) ? getImageUrls(content)[0] : null
  if (doNotRender(slug)) {
    return null
  } else {
    return (
      <div className="card tab-focus-outline-nested">
        <Link href={`/post/${slug}`}>
          <a>
            <div style={{ display: 'flex', height: '7rem' }}>
              <div style={{ display: 'flex', flex: '0 0 40%' }}>
                <div className="date" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', gap: '0.25rem', minWidth: '6rem' }}>
                  <span className="cardDate" style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                    {created && dayjs(created).format('DD/MMM')}
                  </span>
                  <span>{created && dayjs(created).format('YYYY')}</span>
                </div>
                <CardTextContainer>
                  <h2 style={{ fontSize: '1.125rem', textAlign: 'start' }}>{title && title}</h2>
                  <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.25rem' }}>
                    <BiFolderOpen style={{ marginRight: '0.5rem' }} />
                    <span>{category && capitalizeString(category)}</span>
                  </div>
                </CardTextContainer>
              </div>

              <div style={{ flex: 1, display: 'flex', borderLeft: '1px solid', justifyContent: 'center', overflow: 'hidden' }}>
                <img
                  src={thumbnail ?? '/ogp.png'}
                  alt="Post Thumbnail"
                  style={{ objectFit: 'cover', width: '100%' }}
                />
              </div>
            </div>
          </a>
        </Link>
      </div>
    )
  }
}

export default Card
