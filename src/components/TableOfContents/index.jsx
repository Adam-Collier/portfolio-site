import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { styled } from 'goober';
import Stack from '../Stack';
import Text from '../Text';
import Accordion from '../Accordion';

import { useActiveHash } from './use-active-hash';
import { queries } from '../../config';

const Wrapper = styled(Stack)`
  grid-area: toc;

  > ul {
    list-style-type: none;
    margin-left: 0;

    ul {
      margin-top: 0.25rem;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    a:hover:not(.active) {
      color: var(--foreground-hover);
    }

    li {
      list-style-type: none;
    }

    li + li {
      margin-top: 0.25rem;
      margin-bottom: 0;
    }

    .active {
      text-decoration: revert;
      color: var(--primary-accent);
    }
  }

  @media ${queries.sm} {
    display: none;
  }
`;

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
      <Text
        as="li"
        key={key}
        size="sm"
        weight={400}
        color="var(--foreground-high)"
      >
        <Link href={`${path}#${item.id}`}>
          <a className={isActive ? 'active' : ''}>{title}</a>
        </Link>
      </Text>
    );
  });

// pass in the headings as we cant guarantee it will come from the same source e.g markdown vs a CMS
const TableOfContents = ({ headings }) => {
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
    <Wrapper gap={1.45}>
      <Text size="md" heading>
        Table of Contents
      </Text>
      <ul>{createItems(headings, currentPath, activeHash)}</ul>
    </Wrapper>
  );
};

export default TableOfContents;
