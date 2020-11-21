import React, { useState } from 'react';
import Search from '../Search';

import styles from './sidebar.module.css';

const Index = ({
  children,
  title,
  data = '',
  className,
  description,
  searchContext,
}) => {
  const allPosts = data ? data.edges : '';
  const [searchPosts, setSearchPosts] = useState(allPosts);
  const searchedPosts = (posts) => {
    setSearchPosts(posts);
  };

  return (
    <div className={`${className || ''} ${styles.sidebar}`}>
      <div className={styles.sticky}>
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
      </div>
    </div>
  );
};

export default Index;
