import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Stack from '../Stack';
import Text from '../Text';
import { useActiveHash } from './use-active-hash';
import { getHeadings } from '../../lib/table-of-contents';

import s from './toc.module.css';

// depth and maxDepth are used to figure out how many bullets deep to render in the ToC sidebar, if no
// max depth is set via the tableOfContentsDepth field in the frontmatter, all headings will be rendered
const createItems = (items, path, activeHash) =>
  items &&
  items.map((item, key) => {
    const isActive = item.id === activeHash;
    const { title } = item;

    return (
      <Text as="li" key={key} size="sm" weight={400}>
        <Link href={`${path}#${item.id}`}>
          <a className={isActive ? s.active : ''}>{title}</a>
        </Link>
        {item.items && <ul>{createItems(item.items, path, activeHash)}</ul>}
      </Text>
    );
  });

const TableOfContents = ({ className, source }) => {
  const headings = getHeadings(source);
  const router = useRouter();
  const { route, query } = router;

  const currentPath = `${route.substring(0, route.lastIndexOf('/'))}/${
    query.slug
  }`;

  const activeHash = useActiveHash(headings);

  return (
    <Stack gap={1}>
      <Text size="md" heading>
        Table of Contents
      </Text>
      <ul className={`${s.toc} ${className || ''}`}>
        {createItems(headings, currentPath, activeHash)}
      </ul>
    </Stack>
  );
};

export default TableOfContents;
