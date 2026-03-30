import { BsArrowUpCircle } from 'react-icons/bs'

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const TopButton = () => {
  return (
    <button
      aria-label="Scroll To Top"
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        fontSize: '1.5rem',
        cursor: 'pointer',
      }}
    >
      <BsArrowUpCircle />
    </button>
  )
}

export default TopButton
