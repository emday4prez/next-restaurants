import Navbar from './Navbar';
import Head from 'next/head';
import { UserProvider } from '../lib/authContext';
export default function Layout({ user, loading = false, children }) {
  return (
    <UserProvider value={{ user, loading }}>
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
    </UserProvider>
  );
}
