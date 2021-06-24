/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Text from '../Text';
import Stack from '../Stack';

import styles from './blogpost.module.css';

const Blogpost = ({ title, publishedOn, slug, description }) => (
  <article className={styles.blogpost} key={slug}>
    <Link href={`/blog/${slug}`} aria-label={`blog post: ${title}`}>
      <a>
        <Image
          src={require(`/_posts/${slug}/thumbnail.jpg`)}
          alt={title}
          width={80}
          height={80}
        />
        <Stack as="section" gap={0.25}>
          <Text as="h2" size="md" heading>
            {title}
          </Text>
          <Text size="sm">{description}</Text>
          <small>{publishedOn}</small>
        </Stack>
      </a>
    </Link>
  </article>
);
export default React.memo(Blogpost);
