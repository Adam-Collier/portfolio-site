import React, { useState } from 'react';
import { graphql } from 'gatsby';

import MDX from '../components/MDX';
import Page from '../components/Page';
import SEO from '../components/Seo';
import Resources from '../components/Resources';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import Search from '../components/Search';
import Form from '../components/Form';

import { useMediaQuery } from '../hooks/useMediaQuery';

const ResourceTemplate = ({ data, location }) => {
  const { mdx, allMdx } = data;
  const { frontmatter, id, body } = mdx;
  const { title, description, updatedDate } = frontmatter;

  const allPosts = allMdx?.edges || '';
  const [searchPosts, setSearchPosts] = useState(allPosts);
  const searchedPosts = (posts) => {
    setSearchPosts(posts);
  };

  return (
    <Page containerType="fluid" location={location}>
      <SEO
        title={`${title} Resources`}
        description={description}
        pathname={location.pathname}
      />
      <Content>
        <header>
          <p style={{ fontSize: '0.875rem', color: 'var(--foreground-high' }}>
            Updated: {updatedDate}
          </p>
          <h1>{title}</h1>
        </header>
        <MDX body={body} />
        <Form
          title={title}
          text="Do you know a resource that could benefit another reader and is relevent for this page? Let me know by leaving a short message below and I will take a look!"
        />
      </Content>
      <Sidebar
        title="Resources"
        description="This is a group of resources I have either learned something from or thought could become useful in the future."
        noContextMenu
      >
        {useMediaQuery('(min-width: 768px)') && (
          <Search allPosts={allPosts} searchedPosts={searchedPosts} />
        )}
        <Resources posts={searchPosts} id={id} />
      </Sidebar>
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
      fields {
        slug
      }
      body
      frontmatter {
        title
        updatedDate(formatString: "MMMM DD, YYYY")
        description
      }
    }
    allMdx(
      sort: { fields: [frontmatter___title], order: ASC }
      filter: { fileAbsolutePath: { regex: "/resources/" } }
    ) {
      edges {
        node {
          id
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
