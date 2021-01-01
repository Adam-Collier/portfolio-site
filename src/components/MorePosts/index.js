import React from 'react';
import Blogposts from '../Blogposts';
import styles from './moreposts.module.css';

const Index = ({ data }) => (
  <div className={styles.morePosts}>
    <h4>More posts</h4>
    <Blogposts posts={data.edges} />
  </div>
);

export default Index;
