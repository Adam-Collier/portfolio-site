import Document, { Html, Head, Main, NextScript } from 'next/document';
import { extractCss } from 'goober';

class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();

    // Extract the css for each page render
    const css = extractCss();
    return { ...page, css };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="_goober"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: ` ${this.props.css}` }}
          />
          {process.env.NODE_ENV === 'production' && (
            <script
              async
              defer
              data-website-id="5e5ce6b5-3fb0-49eb-ae22-ab3cb1fa483b"
              src="https://umami-production-7v-m.up.railway.app/umami.js"
            />
          )}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicon/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicon/safari-pinned-tab.svg"
            color="#000000"
          />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta
            name="msapplication-config"
            content="/favicon/browserconfig.xml"
          />
          <meta name="theme-color" content="#000" />
          <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
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
