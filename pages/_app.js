import '../styles/globals.css';
import Layout from '../components/Layout';
import { useFetchUser } from '../lib/authContext';

function MyApp({ Component, pageProps }) {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
