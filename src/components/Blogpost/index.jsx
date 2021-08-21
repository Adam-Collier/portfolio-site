/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';

import Text from '../Text';
import Stack from '../Stack';

import s from './blogpost.module.css';

const Blogpost = ({ title, publishedOn, slug, description, thumbnail }) => (
  <article className={s.blogpost} key={slug}>
    <Link href={`/blog/${slug}`} aria-label={`blog post: ${title}`}>
      <a>
        <Image
          // Add this conditional here until we move over to Notion
          src={
            thumbnail || require(`/_posts/${slug}/thumbnail.jpg`).default.src
          }
          alt={title}
          width={114}
          height={114}
        />
        <Stack as="section" gap={0.25}>
          <Text as="h2" size="md" heading>
            {title}
          </Text>
          <Text size="sm" truncate={2}>
            {description}
          </Text>
          <Text size="xs" weight={400}>
            {format(parseISO(publishedOn), 'MMMM dd, yyyy')}
          </Text>
        </Stack>
      </a>
    </Link>
  </article>
);
export default React.memo(Blogpost);
