import React from 'react';
import Blogpost from '../Blogpost';
import Blogposts from '../BlogPosts';
import styles from './moreposts.module.css';

const Index = ({ data }) => (
  <div className={styles.morePosts}>
    <h4>More posts</h4>
    <Blogposts>
      {data.edges.map(({ node }, key) => (
        <Blogpost node={node} key={key} />
      ))}
    </Blogposts>
  </div>
);

export default Index;
