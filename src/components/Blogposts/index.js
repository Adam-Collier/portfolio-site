import React from 'react';
import Blogpost from '../Blogpost';
import styles from './blogposts.module.css';

const Blogposts = ({ posts }) => (
  <div className={styles.blogposts}>
    {posts.map(({ node }, i) => (
      <Blogpost node={node} key={i} />
    ))}
  </div>
);

export default React.memo(Blogposts);
