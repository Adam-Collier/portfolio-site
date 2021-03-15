import React, { useState } from 'react';
import { graphql } from 'gatsby';

import Page from '../components/Page';
import SEO from '../components/Seo';
import Resource from '../components/Resource';
import Content from '../components/Content';
import Search from '../components/Search';

import styles from './resources.module.css';

const ResourceTemplate = ({ data, location }) => {
  const [resources, setResources] = useState(data.allMdx.edges);

  return (
    <Page containerType="fluid" location={location} noSidebar>
      <SEO
        title="Resources"
        description="This is a group of resources I have either learned something from or thought could become useful in the future."
        pathname={location.pathname}
      />

      <Content className={styles.content}>
        <p>
          This is a group of resources I have either learned something from or
          thought could become useful in the future.
        </p>
        <div className={styles.search}>
          <Search allPosts={data.allMdx.edges} searchedPosts={setResources} />
        </div>
        {resources.map(({ node }, key) => (
          <Resource node={node} key={key} />
        ))}
      </Content>
    </Page>
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
            description
          }
        }
      }
    }
  }
`;
