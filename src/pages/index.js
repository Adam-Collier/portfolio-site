import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Timeline from '../components/Timeline';

import styles from './index.module.css';

const IndexPage = ({ location }) => (
  <Layout
    wrapperClass={styles.homeWrapper}
    containerClass={`${styles.home}`}
    containerType="fluid"
  >
    <SEO title="" pathname={location.pathname} />
    <div className={styles.intro}>
      <h1>Hey, I'm Adam</h1>
      <p>
        This site is as much for me as it is for you, it acts as a collection of
        thoughts, aha moments and tidbits of code which always seem to escape my
        little brain somehow. Have a cheeky gander and hit me up with
        anything... literally anything I’ve got time atm... (film
        recommendations, books and music are always encouraged).
      </p>
      <h2>At a glance...</h2>
      <div className={styles.weekList}>
        <p>
          <span>Listening to:</span>{' '}
          <a
            href="https://open.spotify.com/playlist/1PKP8IoY4X2GMNZJgwwuPZ?si=OgdZAtFSS-Gu5jfydPGfRw"
            target="__blank"
            rel="noopener noreferrer"
          >
            Low Key Mellow on Spotify
          </a>
        </p>
        <p>
          <span>Reading:</span>{' '}
          <a
            href="https://www.waterstones.com/book/1q84-books-1-and-2/haruki-murakami/9780099549062"
            target="__blank"
            rel="noopener noreferrer"
          >
            1Q84, Haruki Murakami
          </a>
        </p>
      </div>
    </div>
    <div className={styles.timeline}>
      <Timeline />
    </div>
  </Layout>
);

export default IndexPage;
