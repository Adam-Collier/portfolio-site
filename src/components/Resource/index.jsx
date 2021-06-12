import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'react-feather';
import Text from '../Text';

import s from './resource.module.css';

const Resource = ({ title, description, slug }) => (
  <Link href={`/resources/${slug}`}>
    <a className={s.resource}>
      <article key={slug} aria-label={title}>
        <div>
          <Text as="h3" size="lg" heading>
            {title}
          </Text>
          <ArrowRight size={16} />
        </div>
        <Text>{description}</Text>
      </article>
    </a>
  </Link>
);

export default Resource;
