import React, { useEffect } from 'react';
import { graphql } from 'gatsby';

import MDX from '../components/MDX';
import Layout from '../components/Layout';
import SEO from '../components/Seo';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import MorePosts from '../components/MorePosts';
import TableOfContents from '../components/TableOfContents';

import { useMediaQuery } from '../hooks/useMediaQuery';

import styles from './blog-post.module.css';

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

  const {
    images: desktopImages,
    backgroundColor,
  } = desktopFeatured.childImageSharp.gatsbyImageData;

  const { fallback: desktopFallback, sources: desktopSources } = desktopImages;

  const {
    sources: mobileSources,
  } = mobileFeatured.childImageSharp.gatsbyImageData.images;

  useEffect(() => {
    const wrapper = document.querySelector(`.${styles.heroWrapper}`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (invertHeaderColor) {
              wrapper.style.setProperty('--header-text-color', 'white');
            } else {
              wrapper.style.setProperty('--header-text-color', '#333333');
            }
            wrapper.style.setProperty('--header-background', 'none');
          } else {
            wrapper.style.setProperty(
              '--header-text-color',
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

    observer.observe(document.querySelector(`.${styles.heroImageWrapper}`));

    return () => {
      observer.unobserve(document.querySelector(`.${styles.heroImageWrapper}`));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const image = post.frontmatter.image
    ? post.frontmatter.image.childImageSharp.resize
    : null;

  return (
    <Layout
      containerType="fluid"
      wrapperClass={styles.heroWrapper}
      containerClass={styles.heroBlogpost}
    >
      <SEO
        title={title}
        description={description || excerpt}
        image={image}
        pathname={location.pathname}
        isBlogPost
        publishDate={date}
      />
      <div className={styles.heroImageWrapper}>
        <div
          className={styles.heroImage}
          style={{ background: backgroundColor }}
        >
          <picture>
            {desktopSources.map((source, index) => {
              const { type, srcSet, sizes } = source;
              return (
                <>
                  <source
                    key={index}
                    type={type}
                    srcSet={srcSet}
                    sizes={sizes}
                    media="(min-width: 768px)"
                  />
                </>
              );
            })}
            {mobileSources.map((source, index) => {
              const { type, srcSet, sizes } = source;
              return (
                <>
                  <source
                    key={index}
                    type={type}
                    srcSet={srcSet}
                    sizes={sizes}
                    media="(max-width: 767px)"
                  />
                </>
              );
            })}
            <img
              src={desktopFallback.src}
              srcSet={desktopFallback.srcSet}
              loading="lazy"
              alt="Adam Collier Hero"
            />
          </picture>
        </div>
      </div>
      <Sidebar
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
      <Content>
        <header>
          <h1 id="introduction">{title}</h1>
        </header>
        <section>
          <MDX body={body} />
        </section>
      </Content>
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
            gatsbyImageData(
              quality: 70
              formats: [AUTO, JPG, WEBP, AVIF]
              layout: FULL_WIDTH
              aspectRatio: 2.4
              breakpoints: [750, 1080, 1366, 1440, 1920]
            )
          }
        }
        mobileFeatured: featured {
          childImageSharp {
            gatsbyImageData(
              quality: 80
              formats: [AUTO, JPG, WEBP, AVIF]
              layout: FULL_WIDTH
              aspectRatio: 1.18
              breakpoints: [750, 828, 1080, 1366, 1920]
            )
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
                gatsbyImageData(
                  width: 114
                  quality: 90
                  formats: [AUTO, WEBP, AVIF]
                  layout: CONSTRAINED
                )
              }
            }
            excerpt
            tags
          }
        }
      }
    }
  }
`;
