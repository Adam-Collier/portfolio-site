import React from 'react';
import Link from 'next/link';
import Stack from '../Stack';
import Text from '../Text';
import Row from '../Row';

import s from './footer.module.css';
import GatsbyIcon from '../../icons/gatsby.svg';
import VercelIcon from '../../icons/vercel.svg';
// TODO: sort out spacing for built section
const Footer = () => (
  <Row className={s.footer} maxWidth="lg">
    <Stack gap={0.5} style={{ gridArea: 'pages' }} className={s.links}>
      <Link href="/blog/">
        <a>Blog</a>
      </Link>
      <Link href="/snippets/">
        <a>Snippets</a>
      </Link>
      <Link href="/resources/">
        <a>Resources</a>
      </Link>
    </Stack>
    <span className={s.divider} />
    <Stack gap={0.5} style={{ gridArea: 'social' }} className={s.links}>
      <Text>
        Follow me on{' '}
        <a
          href="https://savee.it/adamcollier/"
          target="__blank"
          rel="noopener noreferrer"
        >
          Savee.it
        </a>
      </Text>
      <Text>
        Tweet me at{' '}
        <a
          href="https://twitter.com/CollierAdam"
          target="__blank"
          rel="noopener noreferrer"
        >
          @collieradam
        </a>
      </Text>
      <Text>
        Checkout my{' '}
        <a
          href="https://github.com/Adam-Collier"
          target="__blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </Text>
    </Stack>
    <Stack gap={0.5} style={{ gridArea: 'meta' }} align="center">
      <Stack direction="row" justify="center" align="center" gap={1}>
        <GatsbyIcon className={s.gatsbyIcon} />
        <Text>Built with Gatsby</Text>
        <span>&</span>
        <VercelIcon className={s.vercelIcon} />
        <Text>Hosted by Vercel</Text>
      </Stack>
      <Text size="sm" color="foreground-max">
        © 2021 Adam Collier. All Rights Reserved.
      </Text>
    </Stack>
  </Row>
);

export default Footer;
