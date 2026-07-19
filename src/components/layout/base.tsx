import Head from 'next/head'

import MobileNavigation from '../MobileNavigation'
import Header from '../Header'
import { Barcode, Rule, Telemetry } from '../deco'

const Footer = () => (
  <footer className="mt-auto pt-16">
    <Rule />
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3">
      <Telemetry />
      <span className="ml-auto flex items-center gap-4">
        <Barcode seed="melon-sour-footer" />
        <span className="text-xs text-ink-4">© Melon Sour</span>
      </span>
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
      <div className="max-w-[900px] mx-auto px-4 pt-4 pb-8 min-h-screen flex flex-col">
        <Header />
        {children}
        <Footer />
      </div>
      <MobileNavigation />
    </>
  )
}

export default Main
