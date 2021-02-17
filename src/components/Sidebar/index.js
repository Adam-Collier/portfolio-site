import React, { useState } from 'react';
import Search from '../Search';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import styles from './sidebar.module.css';

const ConditionalWrapper = ({
  children,
  className,
  noContextMenu,
  noAccordianClose,
}) => {
  const [accordianState, setAccordianState] = useState();

  const handleClick = () => setAccordianState(!accordianState);
  const [title, description, ...content] = children;

  return useMediaQuery('(max-width: 767px)') && !noContextMenu ? (
    <>
      {title}
      {description}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <details className={styles.accordion} open={accordianState}>
        <summary
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
        >
          Context Menu
        </summary>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
        <div
          onClick={() => (noAccordianClose ? undefined : handleClick())}
          onKeyPress={() => (noAccordianClose ? undefined : handleClick())}
        >
          {content}
        </div>
      </details>
    </>
  ) : (
    <div className={`${styles.sidebar} ${className || ''}`}>
      <div className={styles.sticky}>{children}</div>
    </div>
  );
};

const Sidebar = ({
  children,
  title,
  data = '',
  className,
  description,
  noContextMenu,
  noAccordianClose,
  noDescription,
}) => {
  const allPosts = data ? data.edges : '';
  const [searchPosts, setSearchPosts] = useState(allPosts);
  const searchedPosts = (posts) => {
    setSearchPosts(posts);
  };

  return (
    <ConditionalWrapper
      className={className}
      noContextMenu={noContextMenu}
      noAccordianClose={noAccordianClose}
    >
      {title &&
        (title === 'Blog' || title === 'Snippets' ? (
          <h1 className={styles.title}>{title}</h1>
        ) : (
          <span className={styles.title}>{title}</span>
        ))}

      {!noDescription && description && (
        <p className={styles.description}>{description}</p>
      )}

      {data && (
        <div className={styles.bar}>
          <Search allPosts={allPosts} searchedPosts={searchedPosts} />
        </div>
      )}

      <section className={styles.posts}>
        {data ? children({ searchPosts }) : children}
      </section>
    </ConditionalWrapper>
  );
};

export default Sidebar;
