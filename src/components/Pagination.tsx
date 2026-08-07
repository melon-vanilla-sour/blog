import Link from 'next/link'

const Pagination = ({ totalPages, currentPage }: { totalPages: number; currentPage: number }) => {
  const current = Number(currentPage)

  const edgeLink = (label: string, page: number, enabled: boolean) =>
    enabled ? (
      <Link href={`/posts/${page}`}>
        <a className="tab-focus-outline px-2 h-8 leading-8 text-sm text-ink-4 hover:text-ink-6 transition-colors no-underline hover:no-underline">
          {label}
        </a>
      </Link>
    ) : (
      <span className="px-2 h-8 leading-8 text-sm text-ink-2 select-none">{label}</span>
    )

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {edgeLink('‹ Prev', current - 1, current > 1)}
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1
        const isActive = page === current
        return (
          <Link href={`/posts/${page}`} key={index}>
            <a className={`tab-focus-outline inline-block w-8 h-8 leading-8 text-center text-sm no-underline hover:no-underline transition-colors ${
              isActive
                ? 'bg-ink-6 text-ink-0 font-semibold'
                : 'border border-ink-2 text-ink-4 hover:border-ink-3 hover:text-ink-6'
            }`}>
              {page}
            </a>
          </Link>
        )
      })}
      {edgeLink('Next ›', current + 1, current < totalPages)}
    </div>
  )
}

export default Pagination
