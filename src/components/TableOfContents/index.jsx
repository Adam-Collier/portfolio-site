import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Stack from '../Stack';
import Text from '../Text';
import Accordion from '../Accordion';
import { useActiveHash } from './use-active-hash';

import s from './toc.module.css';

// depth and maxDepth are used to figure out how many bullets deep to render in the ToC sidebar, if no
// max depth is set via the tableOfContentsDepth field in the frontmatter, all headings will be rendered
const createItems = (items, path, activeHash) =>
  items &&
  items.map((item, key) => {
    // check if the item id matches the activeHash
    const isActive = item.id === activeHash;
    const { title } = item;

    // check if items it empty or the property doesnt exist
    return item.items?.length ? (
      <li key={key}>
        <Accordion title={title}>
          {item.items && <ul>{createItems(item.items, path, activeHash)}</ul>}
        </Accordion>
      </li>
    ) : (
      <Text as="li" key={key} size="sm" weight={400} color="foreground-high">
        <Link href={`${path}#${item.id}`}>
          <a className={isActive ? s.active : ''}>{title}</a>
        </Link>
        {/* use recursion for nested items */}
        {item.items && <ul>{createItems(item.items, path, activeHash)}</ul>}
      </Text>
    );
  });

// pass in the headings as we cant guarantee it will come from the same source e.g markdown vs a CMS
const TableOfContents = ({ className, headings }) => {
  const router = useRouter();
  const { asPath } = router;
  // the current path without hash
  const currentPath = asPath.substring(0, asPath.lastIndexOf('#'));

  // pass in the headingsList so we can loop and observe each id
  const headingsList = [];

  // recursively grab all of the ids so we can pass them into useActiveHash
  const createHeadingList = (headingsArr) => {
    // loop through the array
    headingsArr.forEach((heading) => {
      // if an id exists push it to the list
      if (heading.id) {
        headingsList.push(heading.id);
      }
      // if that object has some items take advantage of recursion to grab those ids
      if (heading.items) {
        createHeadingList(heading.items);
      }
    });
  };

  createHeadingList(headings);

  const activeHash = useActiveHash(headingsList);

  if (headingsList.length === 0) return null;

  return (
    <Stack gap={1} className={s.wrapper}>
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
