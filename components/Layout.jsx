import Navbar from './Navbar';
import Head from 'next/head';
import { UserProvider } from '../lib/authContext';
import { CartProvider } from 'react-use-cart';
import Loginbar from './Loginbar';

export default function Layout({ user, loading = false, children }) {
  return (
    <>
      <Head>
        <title>Restaurants App</title>
      </Head>
      <CartProvider>
        <UserProvider value={{ user, loading }}>
          <Loginbar />
          <Navbar />

          <main className="px-2 min-w-min">
            <div
              className="
          flex
          justify-center
          md:items-center
          items-left
          bg-indigo-100
          mx-auto
          min-w
          md:w-5/6
          rounded-lg
          mt-8
          p-2
          md:p-16
        "
            >
              <div className="text-2xl font-medium">{children}</div>
            </div>
          </main>
        </UserProvider>
      </CartProvider>
    </>
  );
}
