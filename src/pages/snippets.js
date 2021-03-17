import React from 'react';
import { graphql } from 'gatsby';

import MDX from '../components/MDX';
import Page from '../components/Page';
import SEO from '../components/Seo';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import TableOfContents from '../components/TableOfContents';

import styles from './snippets.module.css';

const Snippets = ({ data, location }) => {
  const { edges } = data.allMdx;

  const concatTableOfContents = edges.reduce((acc, { node }) => {
    acc.push(node.tableOfContents);
    return acc;
  }, []);

  const allTableOfContents = { items: [...concatTableOfContents] };

  const description =
    "There's nothing worse than almost remembering a bit of code you saw on stackoverflow on in a blogpost once. So I've collated all of the ones I find most useful.";

  return (
    <Page
      containerType="fluid"
      containerClass={styles.snippets}
      location={location}
    >
      <SEO
        title="Snippets"
        description={description}
        pathname={location.pathname}
      />
      <Sidebar
        className={styles.sidebar}
        title="Snippets"
        description={description}
      >
        <TableOfContents
          tableOfContents={allTableOfContents}
          location={location}
          className={styles.tableOfContents}
        />
      </Sidebar>
      <Content hasTOC>
        {edges.map(({ node }, key) => {
          const { body } = node;
          return <MDX key={key} body={body} />;
        })}
      </Content>
    </Page>
  );
};

export const query = graphql`
  query {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/snippets/" } }
      sort: { fields: fields___slug }
    ) {
      edges {
        node {
          body
          tableOfContents
          fields {
            slug
          }
        }
      }
    }
  }
`;

export default Snippets;
