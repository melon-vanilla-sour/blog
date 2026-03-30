import Link from 'next/link'

const Pagination = ({ totalPages, currentPage }: { totalPages: number; currentPage: number }) => {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1
        const isActive = page === Number(currentPage)
        return (
          <Link href={`/posts/${page}`} key={index}>
            <a className={`tab-focus-outline inline-block w-8 h-8 leading-8 text-center text-sm border transition-colors ${
              isActive
                ? 'border-ctp-lavender text-ctp-lavender'
                : 'border-ctp-surface1 text-ctp-subtext0 hover:border-ctp-overlay0 hover:text-ctp-text'
            }`}>
              {page}
            </a>
          </Link>
        )
      })}
    </div>
  )
}

export default Pagination
