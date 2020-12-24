import React from 'react';
import { graphql } from 'gatsby';

import MDX from '../components/MDX';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Resource from '../components/Resource';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

const ResourceTemplate = ({ data, location }) => {
  const { mdx } = data;
  const { frontmatter, id, excerpt, body } = mdx;
  const { title } = frontmatter;

  const description =
    'This is a group of resources I have either learned something from or thought could become useful in the future.';

  return (
    <Layout containerType="fluid">
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
      >
        {({ searchPosts }) =>
          searchPosts.map(({ node }, key) => (
            <Resource node={node} key={key} currentPageId={id} />
          ))
        }
      </Sidebar>

      <Content>
        <header>
          <h1>{title}</h1>
        </header>
        <MDX body={body} />
      </Content>
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
