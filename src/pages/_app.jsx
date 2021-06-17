import { StateProvider } from '../context';
import Layout from '../components/Layout';
import '../styles/reset.css';
import '../styles/global.css';
import '../styles/variables.css';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <StateProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </StateProvider>
  );
}
