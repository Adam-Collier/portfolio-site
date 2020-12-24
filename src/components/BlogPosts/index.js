import React from 'react';
import styles from './blogposts.module.css';

const Blogposts = ({ children }) => (
  <div className={styles.blogposts}>{children}</div>
);

export default Blogposts;
