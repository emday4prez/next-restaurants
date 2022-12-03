import Navbar from './Navbar'
import Head from 'next/head'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Restaurants App</title>
      </Head>
      <Navbar />
      <main className="px-4">
        <div
          className="
          flex
          justify-center
          items-center
          bg-indigo-100
          mx-auto
          w-3/4
          rounded-lg
          my-16
          p-16
        "
        >
          <div className="text-2xl font-medium">{children}</div>
        </div>
      </main>
    </>
  )
}
