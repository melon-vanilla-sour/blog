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
      <div>
        <Header />
        {children}
      </div>
      <MobileNavigation />
    </>
  )
}

export default Main
