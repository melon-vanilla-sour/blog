import Link from 'next/link'

const Pagination = ({ totalPages, currentPage }: { totalPages: number; currentPage: number }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
      {[...Array(totalPages)].map((page, index) => (
        <Link href={`/posts/${index + 1}`} key={index}>
          <a
            className="tab-focus-outline"
            style={{
              display: 'inline-block',
              width: '45px',
              height: '45px',
              lineHeight: '45px',
              textAlign: 'center',
              margin: '0 0.5rem',
              cursor: 'pointer',
              caretColor: 'transparent',
              border: index + 1 === currentPage ? '1px solid' : '1px solid transparent',
              borderRadius: '50%',
            }}
          >
            {(index + 1).toString()}
          </a>
        </Link>
      ))}
    </div>
  )
}

export default Pagination
