import React, { useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Blogpost from '../components/Blogpost';
import Blogposts from '../components/BlogPosts';
import Sidebar from '../components/Sidebar';

import styles from './blog.module.css';

const Blog = ({ data, location }) => {
  const { categories, edges: allPosts } = data.allMdx;

  const [posts, setFilteredPosts] = useState(allPosts);
  const [activeTags, setActiveTags] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();

    const tagName = e.target.textContent;

    const selectedTags = activeTags.includes(tagName)
      ? activeTags.filter((x) => x !== tagName)
      : [...activeTags, tagName];

    setActiveTags(selectedTags);

    const filteredPosts = allPosts.filter(({ node }) => {
      const { tags } = node.frontmatter;
      // if post doesnt have any tags return
      if (!tags) return false;
      // if there are no active tags return all posts
      if (selectedTags.length === 0) return node;
      // if selectedTags include a post tag return the tag
      const matchingTags = selectedTags.filter((tag) => tags.includes(tag));
      // if they have matching tags return the post
      return matchingTags.length >= 1;
    });

    setFilteredPosts(filteredPosts);
  };

  const description =
    'A collection of writing which can range from talking about code, design or life in general. Enjoy this eclectic collection of writings';

  return (
    <Layout containerType="fluid">
      <SEO
        title="Blog"
        description={description}
        pathname={location.pathname}
      />
      <Blogposts>
        {posts.map(({ node }, i) => (
          <Blogpost node={node} key={i} />
        ))}
      </Blogposts>
      <Sidebar title="Blog" description={description} noAccordianClose>
        {categories.map(({ category, edges }, key) => {
          const allTags = new Set();
          edges.forEach(({ node }) => {
            node.frontmatter.tags.forEach((tag) => allTags.add(tag));
          });

          return (
            <div className={styles.category} key={key}>
              <span className={styles.categoryTitle}>{category}</span>
              <div className={styles.tags}>
                {[...allTags].map((tag, i) => (
                  <button
                    type="button"
                    key={i}
                    className={`${
                      activeTags.includes(tag) ? styles.active : ''
                    }`}
                    onClick={handleClick}
                    onKeyDown={handleClick}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </Sidebar>
    </Layout>
  );
};

export default Blog;

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
