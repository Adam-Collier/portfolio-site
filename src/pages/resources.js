import React from 'react';
import { graphql } from 'gatsby';

import MDX from '../components/MDX';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Resource from '../components/Resource';
import Sidebar from '../components/Sidebar';

import styles from './resources.module.css';

const ResourceTemplate = ({ data, location }) => {
  const { mdx } = data;
  const { frontmatter, id, excerpt, body } = mdx;
  const { title } = frontmatter;

  const description =
    'This is a group of resources I have either learned something from or thought could become useful in the future.';

  return (
    <Layout containerType="fluid" containerClass={styles.resources}>
      <SEO
        title="Resources"
        description={description || excerpt}
        pathname={location.pathname}
      />

      <Sidebar
        title="Resources"
        data={data.allMdx}
        description={description}
        searchContext="Categories"
        className={styles.sidebar}
      >
        {({ searchPosts }) =>
          searchPosts.map(({ node }, key) => (
            <Resource node={node} key={key} currentPageId={id} />
          ))
        }
      </Sidebar>

      <article className={styles.content}>
        <header>
          <h1>{title}</h1>
        </header>
        <MDX body={body} />
      </article>
    </Layout>
  );
};

export default ResourceTemplate;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fileAbsolutePath: { regex: "/resources/a/" }) {
      id
      excerpt(pruneLength: 160)
      fields {
        slug
      }
      body
      frontmatter {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___title], order: ASC }
      filter: { fileAbsolutePath: { regex: "/resources/" } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 400)
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
