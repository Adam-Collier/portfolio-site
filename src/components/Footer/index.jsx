import React from 'react';
import Link from 'next/link';
import Stack from '../Stack';

import s from './footer.module.css';
import GatsbyIcon from '../../icons/gatsby.svg';
import VercelIcon from '../../icons/vercel.svg';

const Footer = () => (
  <Stack as="footer" className={s.footer} maxWidth="lg">
    <div className={s.pages}>
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
    <span className={s.divider} />
    <div className={s.social}>
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
    <span className={s.built}>
      <GatsbyIcon className={s.gatsbyIcon} />
      <p>Built with Gatsby</p>
      <span>&</span>
      <VercelIcon className={s.vercelIcon} />
      <p>Hosted by Vercel</p>
    </span>
    <small className={s.copyright}>
      © 2021 Adam Collier. All Rights Reserved.
    </small>
  </Stack>
);

export default Footer;
