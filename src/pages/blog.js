import React, { useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Blogposts from '../components/Blogposts';
import TagFilters from '../components/TagFilter';
import Sidebar from '../components/Sidebar';

const BlogPageContent = ({ allPosts, categories, description }) => {
  const [posts, setFilteredPosts] = useState(allPosts);

  return (
    <>
      <Blogposts posts={posts} />
      <Sidebar title="Blog" description={description} noAccordianClose>
        <TagFilters
          categories={categories}
          allPosts={allPosts}
          setFilteredPosts={setFilteredPosts}
        />
      </Sidebar>
    </>
  );
};

const Blog = ({ data, location }) => {
  const { categories, edges: allPosts } = data.allMdx;

  const description =
    'A collection of writing which can range from talking about code, design or life in general. Enjoy this eclectic collection of writings';

  return (
    <Layout containerType="fluid" location={location.pathname}>
      <SEO
        title="Blog"
        description={description}
        pathname={location.pathname}
      />
      <BlogPageContent
        allPosts={allPosts}
        categories={categories}
        description={description}
      />
    </Layout>
  );
};

export default React.memo(Blog);

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: fields___date, order: DESC }
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
              publicURL
              extension
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
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
      tags: group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
      categories: group(field: frontmatter___category) {
        category: fieldValue
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
      }
    }
  }
`;
