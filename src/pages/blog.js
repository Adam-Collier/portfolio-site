import React, { useState } from 'react';
import { graphql } from 'gatsby';

import Page from '../components/Page';
import SEO from '../components/Seo';
import Blogposts from '../components/Blogposts';
import TagFilters from '../components/TagFilter';
import Sidebar from '../components/Sidebar';

const BlogPageContent = ({ allPosts, categories, description }) => {
  const [posts, setFilteredPosts] = useState(allPosts);

  return (
    <>
      <Blogposts posts={posts} style={{ minHeight: '80vh' }} />
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
    <Page containerType="fluid" location={location}>
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
    </Page>
  );
};

export default React.memo(Blog);

export const query = graphql`
  {
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
                gatsbyImageData(
                  width: 114
                  quality: 90
                  formats: [AUTO, WEBP, AVIF]
                  layout: CONSTRAINED
                )
              }
            }
            description
            excerpt
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
