import Head from 'next/head'

import MobileNavigation from '../MobileNavigation'
import Header from '../Header'
import { Rule } from '../deco'

const Footer = () => (
  <footer className="mt-auto pt-16 pb-6">
    <Rule />
    <div className="flex items-center py-4 text-sm text-ink-4">
      <span>© Melon Sour</span>
    </div>
  </footer>
)

const Main = ({ children }) => {
  return (
    <>
      <Head>
        <title>Melon Sour</title>
        <meta name="author" content="Melon Sour" />
        <meta name="description" content="A blog about programming, games and tech" />
      </Head>
      <div className="max-w-[900px] mx-auto px-4 pt-4 pb-24 sm:pb-8 min-h-screen flex flex-col">
        <Header />
        {children}
        <Footer />
      </div>
      <MobileNavigation />
    </>
  )
}

export default Main
