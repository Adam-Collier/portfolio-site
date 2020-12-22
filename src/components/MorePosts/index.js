import React from 'react';
import Blogpost from '../Blogpost';
import styles from './moreposts.module.css';

const Index = ({ data }) => (
  <div className={styles.morePosts}>
    <h4>More posts</h4>
    <div className={styles.blogposts}>
      {data.edges.map(({ node }, key) => (
        <Blogpost node={node} key={key} />
      ))}
    </div>
  </div>
);

export default Index;
