import React from 'react';
import { setup } from 'goober';
import { shouldForwardProp } from 'goober/should-forward-prop';
import { prefix } from 'goober/prefixer';
import { StateProvider } from '../context';
import Layout from '../components/Layout';

import '../styles/reset.css';
import '../styles/global.css';
import '../styles/variables.css';

// This could be the best place to define it once.
// Since `_app.js is running for both
setup(
  React.createElement,
  prefix,
  undefined,
  shouldForwardProp(
    (prop) =>
      // Do NOT forward props that start with `$` symbol
      prop['0'] !== '$'
  )
);

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
