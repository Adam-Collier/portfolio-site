import React from 'react';
// import { Link } from 'gatsby';
import { useActiveHash } from './use-active-hash';

import styles from './tableOfContent.module.css';

// depth and maxDepth are used to figure out how many bullets deep to render in the ToC sidebar, if no
// max depth is set via the tableOfContentsDepth field in the frontmatter, all headings will be rendered
const createItems = (items, location, activeHash) =>
  items &&
  items.map((item, key) => (
    // const isActive = item.url === `#${activeHash}`;

    <li key={key}>
      {item.url && (
        <div />
        // <Link
        //   className={isActive ? styles.active : ''}
        //   to={location.pathname + item.url}
        // >
        //   {item.title}
        // </Link>
      )}
      {item.items && <ul>{createItems(item.items, location, activeHash)}</ul>}
    </li>
  ));

const TableOfContents = ({ tableOfContents, location, className }) => {
  const getHeadingIds = (toc) => {
    const idList = [];
    const hashToId = (str) => str.slice(1);

    if (toc) {
      for (const item of toc) {
        // Sometimes url does not exist on item. See #19851
        if (item.url) {
          idList.push(hashToId(item.url));
        }

        // Only traverse sub-items if specified (they are not displayed in ToC)
        // recursion depth should only go up to 6 headings deep and may come in as
        // undefined if not set in the tableOfContentsDepth frontmatter field
        if (item.items) {
          idList.push(...getHeadingIds(item.items));
        }
      }
    }

    return idList;
  };

  const activeHash = useActiveHash(getHeadingIds(tableOfContents.items));

  return (
    <>
      <span className={styles.title}>Table of Contents</span>
      <ul className={`${styles.tableOfContents} ${className || ''}`}>
        {createItems(tableOfContents.items, location, activeHash)}
      </ul>
    </>
  );
};

export default TableOfContents;
