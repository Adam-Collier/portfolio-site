import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'react-feather';
import Text from '../Text';
import Stack from '../Stack';

import s from './resource.module.css';

const ResourceCollection = ({ title, description, url }) => (
  <Link href={url}>
    <a className={s.resource}>
      <Stack as="article" gap={0.5} aria-label={title}>
        <Stack direction="row" gap={0.5} align="center">
          <Text as="h2" size="lg" heading>
            {title}
          </Text>
          <ArrowRight size={16} />
        </Stack>
        <Text>{description}</Text>
      </Stack>
    </a>
  </Link>
);

export default ResourceCollection;
