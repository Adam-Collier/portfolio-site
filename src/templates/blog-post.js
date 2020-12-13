import React from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';

import MDX from '../components/MDX';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Sidebar from '../components/Sidebar';
import MorePosts from '../components/MorePosts';
import TableOfContents from '../components/TableOfContents';

import { useMediaQuery } from '../hooks/useMediaQuery';

import styles from './blog-post.module.css';

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx;
  const { frontmatter, body, fields } = post;
  const { title, date } = fields;
  const { description, excerpt, featured, tags } = frontmatter;

  const { tableOfContents, timeToRead } = post;

  const image = post.frontmatter.image
    ? post.frontmatter.image.childImageSharp.resize
    : null;

  return (
    <Layout containerType="fluid" containerClass={`${styles.blogpost}`}>
      <SEO
        title={title}
        description={description || excerpt}
        image={image}
        pathname={location.pathname}
      />
      <Sidebar
        className={styles.sidebar}
        description={useMediaQuery('(min-width: 768px)') ? description : ''}
        noContextMenu
      >
        {useMediaQuery('(min-width: 768px)') &&
          Object.keys(tableOfContents).length !== 0 && (
            <TableOfContents
              tableOfContents={tableOfContents}
              location={location}
            />
          )}
        <div className={styles.postMeta}>
          <div className={styles.written}>
            <h4>Written</h4>
            <p>{date}</p>
            <p>{timeToRead} minute read</p>
          </div>
          <div className={styles.tags}>
            <h4>Tags</h4>
            {tags.map((tag, index) => (
              <div key={index}>{tag}</div>
            ))}
          </div>
        </div>
      </Sidebar>
      <article className={styles.content}>
        <header>
          <h1 id="introduction">{title}</h1>
        </header>
        {featured && (
          <Image
            style={{
              marginBottom: '2rem',
            }}
            sizes={featured.childImageSharp.sizes}
          />
        )}
        <section>
          <MDX body={body} />
        </section>
      </article>
      <MorePosts data={data.allMdx} />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      tableOfContents
      timeToRead
      fields {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      frontmatter {
        tags
        description
        featured {
          childImageSharp {
            sizes(maxWidth: 720, quality: 90, toFormat: JPG) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
        image: featured {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
      }
    }
    allMdx(
      sort: { fields: [fields___date], order: DESC }
      limit: 2
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        frontmatter: { published: { eq: true } }
        id: { ne: $id }
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
    }
  }
`;
