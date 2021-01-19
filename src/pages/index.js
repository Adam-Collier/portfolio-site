import React from 'react';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Timeline from '../components/Timeline';
import Card from '../components/Card';
import Spotify from '../components/Spotify';
import Readng from '../components/Readng';

import styles from './index.module.css';

const IndexPage = ({ location }) => (
  <Layout
    wrapperClass={styles.homeWrapper}
    containerClass={styles.home}
    containerType="fluid"
    location={location.pathname}
  >
    <SEO
      title=""
      description="Hey I'm Adam Collier and this is my site. Here you will find useful Snippets, Resources and Blogposts"
      pathname={location.pathname}
    />
    <Card className={styles.intro}>
      <h1>Hey, I'm Adam</h1>
      <p>
        This site is as much for me as it is for you, it acts as a collection of
        thoughts, ideas, and documenting processes. We are always learning, so
        why not make it easier for ourselves.
      </p>
    </Card>

    <Card className={styles.spotify}>
      <Spotify />
    </Card>

    <Card className={styles.timeline}>
      <Timeline />
    </Card>

    <Card className={styles.readng}>
      <Readng />
    </Card>
  </Layout>
);

export default IndexPage;
