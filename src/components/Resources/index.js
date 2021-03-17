import React from 'react';
import styles from './resources.module.css';
import ResourceLink from './ResourceLink';

const Resources = ({ posts, id }) => (
  <div className={styles.resources}>
    {posts.map(({ node }, key) => (
      <ResourceLink node={node} key={key} currentPageId={id} />
    ))}
  </div>
);

export default Resources;
