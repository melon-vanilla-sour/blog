import Link from 'next/link'

import { CardTextContainer } from '../components/Card'
import { Tag } from './deco'

function MediumCard({ link, imgSrc, name, description, stack }) {
  return (
    <Link href={link}>
      <a className="no-underline hover:no-underline">
        <div className="card tab-focus-outline flex flex-col group">
          <div className="overflow-hidden border-b border-ink-2">
            <img
              src={imgSrc}
              alt={name}
              className="w-full h-52 object-cover saturate-[1.1]"
            />
          </div>
          <CardTextContainer>
            <h2 className="text-ink-6 text-base sm:text-lg font-semibold">{name}</h2>
            <p className="text-ink-4 text-sm">{description}</p>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {stack.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </CardTextContainer>
        </div>
      </a>
    </Link>
  )
}

export default MediumCard
