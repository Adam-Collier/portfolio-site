import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/seo';

import styles from './index.module.css';

const IndexPage = () => (
  <Layout
    wrapperClass={styles.homeWrapper}
    containerClass={`${styles.home}`}
    containerType="fluid"
  >
    <SEO title="" />
    <div className={styles.intro}>
      <h1>Hey, I'm Adam</h1>
      <p>
        This site is as much for me as it is for you, it acts as a collection of
        thoughts, aha moments and tidbits of code which always seem to escape my
        little brain somehow. Have a cheeky gander and hit me up with
        anything... literally anything I’ve got time atm... (film
        recommendations, books and music are always encouraged).
      </p>
      <h2>This week I'm...</h2>
      <div className={styles.weekList}>
        <p>
          <span>Watching:</span>{' '}
          <a href="/netflix/bly-manor">The Haunting of Bly Manor</a>
        </p>
        <p>
          <span>Listening to:</span>{' '}
          <a href="/netflix/bly-manor">Low Key Mellow</a>
        </p>
        <p>
          <span>Podcasting:</span>{' '}
          <a href="/netflix/bly-manor">This American Life</a>
        </p>
        <p>
          <span>Reading:</span>{' '}
          <a href="/netflix/bly-manor">Killing Commendatore, Murakami</a>
        </p>
      </div>
    </div>
    <div className={styles.timeline}>
      <p>timeline goes here</p>
    </div>
  </Layout>
);

export default IndexPage;
