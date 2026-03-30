import Link from 'next/link'
import { BiWrench } from 'react-icons/bi'

import { CardTextContainer } from '../components/Card'

function MediumCard({ link, imgSrc, name, description, stack }) {
  return (
    <div>
      <Link href={link}>
        <a>
          <div className="card tab-focus-outline">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <img
                src={imgSrc}
                alt="Post Thumbnail"
                style={{ width: '420px', height: '240px', objectFit: 'cover' }}
              />
              <CardTextContainer>
                <h2 style={{ fontSize: '1rem', textAlign: 'start' }}>{name}</h2>
                <div style={{ display: 'flex', alignItems: 'center' }}>{description}</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <BiWrench style={{ marginRight: '0.5rem' }} />
                  {stack.join(', ')}
                </div>
              </CardTextContainer>
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default MediumCard
