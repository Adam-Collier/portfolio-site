import React from 'react';
import { graphql } from 'gatsby';

import MDX from '../components/MDX';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Resource from '../components/Resource';
import Sidebar from '../components/Sidebar';

import styles from './resources.module.css';

const ResourceTemplate = ({ data, location }) => {
  const { mdx, site } = data;
  const { frontmatter, id, excerpt, body } = mdx;
  const { title, description } = frontmatter;

  const siteTitle = site.siteMetadata.title;

  return (
    <Layout
      location={location}
      title={siteTitle}
      containerType="fluid"
      containerClass={styles.resources}
    >
      <SEO title={`${title} Resources`} description={description || excerpt} />

      <Sidebar
        title="Resources"
        data={data.allMdx}
        description="This is a group of resources I have either learned something from or thought could become useful in the future."
        searchContext="Categories"
        className={styles.sidebar}
      >
        {({ searchPosts }) =>
          searchPosts.map(({ node }, i) => (
            <Resource node={node} key={i} currentPageId={id} />
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
  query ResourceBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
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
