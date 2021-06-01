import React from 'react';
import Link from 'next/link';

import styles from './footer.module.css';
import GatsbyIcon from '../../icons/gatsby.svg';
import VercelIcon from '../../icons/vercel.svg';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.pages}>
      <Link href="/blog/">
        <a>Blog</a>
      </Link>
      <Link href="/snippets/">
        <a>Snippets</a>
      </Link>
      <Link href="/resources/">
        <a>Resources</a>
      </Link>
    </div>
    <span className={styles.divider} />
    <div className={styles.social}>
      <p>
        Follow me on{' '}
        <a
          href="https://savee.it/adamcollier/"
          target="__blank"
          rel="noopener noreferrer"
        >
          Savee.it
        </a>
      </p>
      <p>
        Tweet me at{' '}
        <a
          href="https://twitter.com/CollierAdam"
          target="__blank"
          rel="noopener noreferrer"
        >
          @collieradam
        </a>
      </p>
      <p>
        Checkout my{' '}
        <a
          href="https://github.com/Adam-Collier"
          target="__blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </p>
    </div>
    <span className={styles.built}>
      <GatsbyIcon className={styles.gatsbyIcon} />
      <p>Built with Gatsby</p>
      <span>&</span>
      <VercelIcon className={styles.vercelIcon} />
      <p>Hosted by Vercel</p>
    </span>
    <small className={styles.copyright}>
      © 2021 Adam Collier. All Rights Reserved.
    </small>
  </footer>
);

export default Footer;
