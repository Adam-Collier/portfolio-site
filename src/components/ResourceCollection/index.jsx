import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'react-feather';
import Text from '../Text';
import Stack from '../Stack';
import {styled} from "goober"

import s from './resource.module.css';

const Wrapper = styled("div")`
  position: relative;
`

const ResourceCollection = ({ title, description, url, children }) => (
  <Wrapper>
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
    {children}
  </Wrapper>
);

export default ResourceCollection;
