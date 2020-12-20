import React from 'react';
import { graphql } from 'gatsby';

import MDX from '../components/MDX';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Sidebar from '../components/Sidebar';
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
    <Layout containerType="fluid" containerClass={styles.snippets}>
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
      <div className={styles.content}>
        {edges.map(({ node }, key) => {
          const { body } = node;

          return <MDX key={key} body={body} />;
        })}
      </div>
    </Layout>
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
