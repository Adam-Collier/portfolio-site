import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Blogpost from '../Blogpost';
import styles from './moreposts.module.css';

const Index = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.morePosts}>
      <h4>More posts</h4>
      <div className={styles.blogposts}>
        {data.edges.map(({ node }, i) => (
          <Blogpost node={node} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Index;
