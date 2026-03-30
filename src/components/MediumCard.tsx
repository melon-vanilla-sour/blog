import Link from 'next/link'
import { BiWrench } from 'react-icons/bi'

import { CardTextContainer } from '../components/Card'

function MediumCard({ link, imgSrc, name, description, stack }) {
  return (
    <div>
      <Link href={link}>
        <a className="no-underline hover:no-underline">
          <div className="card tab-focus-outline flex flex-col">
            <div className="overflow-hidden border-b border-ctp-surface1">
              <img
                src={imgSrc}
                alt={name}
                className="w-full h-52 object-cover opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
            <CardTextContainer>
              <h2 className="text-ctp-text text-sm font-medium">{name}</h2>
              <p className="text-ctp-subtext0 text-xs">{description}</p>
              <div className="flex items-center gap-1 text-ctp-overlay0 text-xs">
                <BiWrench />
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
