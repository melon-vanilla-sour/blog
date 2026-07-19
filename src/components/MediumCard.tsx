import Link from 'next/link'

import { CardTextContainer } from '../components/Card'

function MediumCard({ link, imgSrc, name, description, stack }) {
  return (
    <div>
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
              <h2 className="text-ink-6 text-sm font-semibold">{name}</h2>
              <p className="text-ink-4 text-xs">{description}</p>
              <div className="text-ink-4 text-xs">
                <span className="text-ink-3 uppercase tracking-widest mr-1">Stack:</span>
                <span>{stack.join(', ')}</span>
              </div>
            </CardTextContainer>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default MediumCard
