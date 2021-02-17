import React from 'react';
import { graphql } from 'gatsby';

import MDX from '../components/MDX';
import Page from '../components/Page';
import SEO from '../components/Seo';
import Resource from '../components/Resource';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';

const ResourceTemplate = ({ data, location }) => {
  const { mdx } = data;
  const { frontmatter, id, excerpt, body } = mdx;
  const { title, description, updatedDate } = frontmatter;

  return (
    <Page containerType="fluid" location={location}>
      <SEO
        title={`${title} Resources`}
        description={description || excerpt}
        pathname={location.pathname}
      />
      <Sidebar
        title="Resources"
        data={data.allMdx}
        description="This is a group of resources I have either learned something from or thought could become useful in the future."
      >
        {({ searchPosts }) =>
          searchPosts.map(({ node }, key) => (
            <Resource node={node} key={key} currentPageId={id} />
          ))
        }
      </Sidebar>
      <Content>
        <header>
          <p style={{ fontSize: '0.875rem', color: 'var(--foreground-high' }}>
            Updated: {updatedDate}
          </p>
          <h1>{title}</h1>
        </header>
        <MDX body={body} />
      </Content>
    </Page>
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
        updatedDate(formatString: "MMMM DD, YYYY")
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
          rawBody
        }
      }
    }
  }
`;
