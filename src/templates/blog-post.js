import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import MDX from '../components/MDX';
import Page from '../components/Page';
import SEO from '../components/Seo';
import SharePost from '../components/SharePost';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import MorePosts from '../components/MorePosts';
import TableOfContents from '../components/TableOfContents';
import Form from '../components/Form';

import { useMediaQuery } from '../hooks/useMediaQuery';

import styles from './blog-post.module.css';

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx;
  const { siteUrl } = data.site.siteMetadata;
  const { frontmatter, body, fields } = post;
  const { title, date, slug } = fields;
  const { description, featured, tags, updatedDate } = frontmatter;

  const { tableOfContents, timeToRead } = post;

  const image = post.frontmatter.image
    ? post.frontmatter.image.childImageSharp.resize
    : null;

  return (
    <Page
      containerType="fluid"
      containerClass={styles.blogpost}
      location={location}
    >
      <SEO
        title={title}
        description={description}
        image={image}
        pathname={location.pathname}
        isBlogPost
      />
      <Sidebar
        className={styles.sidebar}
        description={useMediaQuery('(min-width: 768px)') ? description : ''}
        noContextMenu
        noDescription
      >
        {useMediaQuery('(min-width: 768px)') &&
          Object.keys(tableOfContents).length !== 0 && (
            <TableOfContents
              tableOfContents={tableOfContents}
              location={location}
            />
          )}
        <div className={styles.postMeta}>
          {updatedDate === date || !updatedDate ? (
            <div className={styles.written}>
              <h4>Written</h4>
              <p>{date}</p>
              <p>{timeToRead} minute read</p>
            </div>
          ) : (
            <div className={styles.written}>
              <h4>Updated</h4>
              <p>{updatedDate}</p>
              <p>{timeToRead} minute read</p>
            </div>
          )}

          <SharePost url={`${siteUrl}${slug}`} />

          <div className={styles.tags}>
            <h4>Tags</h4>
            {tags.map((tag, key) => (
              <div key={key}>{tag}</div>
            ))}
          </div>
        </div>
      </Sidebar>
      <Content hasTOC>
        <header>
          <h1 id="introduction">{title}</h1>
        </header>
        {featured && (
          <GatsbyImage
            style={{ marginBottom: '1.45rem' }}
            image={featured.childImageSharp.gatsbyImageData}
            alt={`${title} featured`}
          />
        )}
        <section>
          <MDX body={body} />
        </section>
        <Form title={title} />
      </Content>
      <MorePosts data={data.allMdx} />
    </Page>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    mdx(id: { eq: $id }) {
      id
      body
      tableOfContents
      timeToRead
      fields {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
      }
      frontmatter {
        tags
        description
        featured {
          childImageSharp {
            gatsbyImageData(
              width: 700
              quality: 90
              formats: [AUTO, WEBP, AVIF]
              layout: CONSTRAINED
            )
          }
        }
        updatedDate(formatString: "MMMM DD, YYYY")
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
          fields {
            slug
            title
            date(formatString: "MMMM DD, YYYY")
          }
          frontmatter {
            thumbnail {
              childImageSharp {
                gatsbyImageData(
                  width: 114
                  quality: 90
                  formats: [AUTO, WEBP, AVIF]
                  layout: CONSTRAINED
                )
              }
            }
            tags
            description
          }
        }
      }
    }
  }
`;
