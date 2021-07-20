import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {process.env.NODE_ENV === 'production' && (
            <script
              async
              defer
              data-website-id="5e5ce6b5-3fb0-49eb-ae22-ab3cb1fa483b"
              src="https://umami-production-7v-m.up.railway.app/umami.js"
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
