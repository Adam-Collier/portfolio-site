import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Blogpost from '../Blogpost';
import styles from './moreposts.module.css';

const Index = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(
        sort: { fields: [fields___date], order: DESC }
        limit: 2
        filter: {
          fileAbsolutePath: { regex: "/blog/" }
          frontmatter: { published: { eq: true } }
        }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            fields {
              slug
              title
              date(formatString: "MMMM DD, YYYY")
            }
            frontmatter {
              thumbnail {
                childImageSharp {
                  fluid(maxWidth: 114, quality: 90, toFormat: JPG) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              tags
            }
          }
        }
      }
    }
  `);

  return (
    <div className={styles.morePosts}>
      <h4>More posts</h4>
      <div className={styles.blogposts}>
        {data.allMdx.edges.map(({ node }, i) => (
          <Blogpost node={node} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Index;
