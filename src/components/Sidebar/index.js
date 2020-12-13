import React, { useState } from 'react';
import Search from '../Search';
import { useMediaQuery } from '../../hooks/useMediaQuery';

import styles from './sidebar.module.css';

const ConditionalWrapper = ({ children, className, noContextMenu }) => {
  const [title, description, ...content] = children;
  return useMediaQuery('(max-width: 767px)') && !noContextMenu ? (
    <>
      {title}
      {description}
      <details className={styles.accordion}>
        <summary>Context Menu</summary>
        {content}
      </details>
    </>
  ) : (
    <div className={`${className || ''} ${styles.sidebar}`}>
      <div className={styles.sticky}>{children}</div>
    </div>
  );
};

const Index = ({
  children,
  title,
  data = '',
  className,
  description,
  searchContext,
  noContextMenu,
}) => {
  const allPosts = data ? data.edges : '';
  const [searchPosts, setSearchPosts] = useState(allPosts);
  const searchedPosts = (posts) => {
    setSearchPosts(posts);
  };

  return (
    <ConditionalWrapper className={className} noContextMenu={noContextMenu}>
      {title &&
        (title === 'Blog' || title === 'Snippets' ? (
          <h1 className={styles.title}>{title}</h1>
        ) : (
          <span className={styles.title}>{title}</span>
        ))}

      {description && <p className={styles.description}>{description}</p>}

      {data && (
        <div className={styles.bar}>
          <span>{searchContext}</span>
          <Search allPosts={allPosts} searchedPosts={searchedPosts} />
        </div>
      )}

      <section className={styles.posts}>
        {data ? children({ searchPosts }) : children}
      </section>
    </ConditionalWrapper>
  );
};

export default Index;
