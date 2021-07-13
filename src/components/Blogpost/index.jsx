/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';

import Text from '../Text';
import Stack from '../Stack';

import styles from './blogpost.module.css';

const Blogpost = ({ title, publishedOn, slug, description }) => (
  <article className={styles.blogpost} key={slug}>
    <Link href={`/blog/${slug}`} aria-label={`blog post: ${title}`}>
      <a>
        <Image
          src={require(`/_posts/${slug}/thumbnail.jpg`).default.src}
          alt={title}
          width={114}
          height={114}
        />
        <Stack as="section" gap={0.25}>
          <Text as="h2" size="md" heading>
            {title}
          </Text>
          <Text size="sm">{description}</Text>
          <small>{format(parseISO(publishedOn), 'MMMM dd, yyyy')}</small>
        </Stack>
      </a>
    </Link>
  </article>
);
export default React.memo(Blogpost);
