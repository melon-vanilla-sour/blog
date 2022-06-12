import Head from 'next/head'

const Main = ({ children }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Melon Sour's homepage" />
        <meta name="author" content="Melon Sour" />
        <meta property="og:type" content="website" />
        <title>Melon Sour</title>
      </Head>
      {children}
    </>
  )
}

export default Main
