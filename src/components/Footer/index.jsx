import React from 'react';
import Link from 'next/link';
import Stack from '../Stack';
import Text from '../Text';
import Grid from '../Grid';

import s from './footer.module.css';
import NextIcon from '../../icons/nextjs.svg';
import VercelIcon from '../../icons/vercel.svg';
// TODO: sort out spacing for built section
const Footer = () => (
  <Grid
    align="center"
    areas={{
      default: `'pages divider social'
  'meta meta meta'`,
      sm: `'pages divider social'
  'meta meta meta'`,
    }}
    className={s.footer}
    columns={{
      default: '1fr 1px 1fr',
      sm: '0.5fr 1px 1fr',
    }}
    gap="1.5rem 1rem"
    justify="center"
    maxWidth="lg"
  >
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
        <Text>Built with</Text>
        <NextIcon style={{ width: '48px' }} />
        <span>|</span>
        <Text>Hosted by Vercel</Text>
      </Stack>
      <Text size="sm" color="foreground-max">
        © 2021 Adam Collier. All Rights Reserved.
      </Text>
    </Stack>
  </Grid>
);

export default Footer;
