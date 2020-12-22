import React, { useEffect } from 'react';
import { graphql } from 'gatsby';
import Image from 'gatsby-image';

import MDX from '../components/MDX';
import Layout from '../components/Layout';
import SEO from '../components/seo';
import Sidebar from '../components/Sidebar';
import MorePosts from '../components/MorePosts';
import TableOfContents from '../components/TableOfContents';

import { useMediaQuery } from '../hooks/useMediaQuery';

import styles from './blog-post-hero-layout.module.css';

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx;
  const { frontmatter, body, fields } = post;
  const { title, date } = fields;
  const {
    description,
    excerpt,
    desktopFeatured,
    mobileFeatured,
    tags,
    invertHeaderColor,
  } = frontmatter;

  const { tableOfContents, timeToRead } = post;

  useEffect(() => {
    const wrapper = document.querySelector(`.${styles.wrapper}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (invertHeaderColor) {
              wrapper.style.setProperty('--header-color', 'white');
            } else {
              wrapper.style.setProperty('--header-color', '#333333');
            }
            wrapper.style.setProperty('--header-background', 'none');
          } else {
            wrapper.style.setProperty(
              '--header-color',
              'var(--primary-foreground)'
            );
            wrapper.style.setProperty(
              '--header-background',
              'var(--primary-background)'
            );
          }
        });
      },
      {
        rootMargin: `-24px 0% 0% 0%`,
      }
    );

    observer.observe(document.querySelector(`.${styles.heroWrapper}`));

    return () => {
      observer.unobserve(document.querySelector(`.${styles.heroWrapper}`));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const image = post.frontmatter.image
    ? post.frontmatter.image.childImageSharp.resize
    : null;

  const featuredSources = [
    { ...mobileFeatured.childImageSharp.fluid, media: `(max-width: 767px)` },
    {
      ...desktopFeatured.childImageSharp.fluid,
      media: `(min-width: 768px)`,
    },
  ];

  return (
    <Layout
      containerType="fluid"
      wrapperClass={styles.wrapper}
      containerClass={`${styles.blogpost}`}
    >
      <SEO
        title={title}
        description={description || excerpt}
        image={image}
        pathname={location.pathname}
        isBlogPost
      />
      <div className={styles.heroWrapper}>
        <Image fluid={featuredSources} className={styles.heroImage} />
      </div>
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
            {tags.map((tag, key) => (
              <div key={key}>{tag}</div>
            ))}
          </div>
        </div>
      </Sidebar>
      <article className={styles.content}>
        <header>
          <h1 id="introduction">{title}</h1>
        </header>
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
  query BlogPostHeroLayoutBySlug($id: String) {
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
        invertHeaderColor
        desktopFeatured: featured {
          childImageSharp {
            fluid(maxWidth: 1920, maxHeight: 800, quality: 90, toFormat: JPG) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        mobileFeatured: featured {
          childImageSharp {
            fluid(maxWidth: 768, maxHeight: 650, quality: 90, toFormat: JPG) {
              ...GatsbyImageSharpFluid_withWebp
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
