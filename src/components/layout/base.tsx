import Head from 'next/head'

import MobileNavigation from '../MobileNavigation'
import Header from '../Header'

const Main = ({ children }) => {
  return (
    <>
      <Head>
        <title>Melon Sour</title>
        <meta name="author" content="Melon Sour" />
        <meta name="description" content="A blog about programming, games and tech" />
      </Head>
      <div className="max-w-[900px] mx-auto px-4 pt-4 pb-16 min-h-screen flex flex-col">
        <Header />
        {children}
      </div>
      <MobileNavigation />
    </>
  )
}

export default Main
