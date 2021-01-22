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
      <h1>Hey, I'm Adam Collier</h1>
      <p>
        A designer and developer from Manchester, UK. Instead of the traditional
        portfolio site that never gets updated I wanted to make something
        functional, practical and useful in my day to day. It will exist as an
        ever growing repository of ideas, productivity helpers and things I
        enjoy. Something noteworthy I should add? Send me a message.
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
