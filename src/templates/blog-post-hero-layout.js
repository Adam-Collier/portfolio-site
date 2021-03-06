import React, { useEffect } from 'react';
import { graphql } from 'gatsby';

import MDX from '../components/MDX';
import Page from '../components/Page';
import SEO from '../components/Seo';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import MorePosts from '../components/MorePosts';
import TableOfContents from '../components/TableOfContents';
import SharePost from '../components/SharePost';

import { useMediaQuery } from '../hooks/useMediaQuery';

import styles from './blog-post.module.css';

const BlogPostTemplate = ({ data, location }) => {
  const post = data.mdx;
  const { siteUrl } = data.site.siteMetadata;
  const { frontmatter, body, fields } = post;
  const { title, date, slug } = fields;

  const {
    description,
    desktopFeatured,
    mobileFeatured,
    tags,
    invertHeaderColor,
    updatedDate,
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
    const wrapper = document.querySelector(`.page-wrapper`);
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
    <Page
      containerType="fluid"
      wrapperClass={styles.heroWrapper}
      containerClass={styles.heroBlogpost}
    >
      <SEO
        title={title}
        description={description}
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
                <source
                  key={index}
                  type={type}
                  srcSet={srcSet}
                  sizes={sizes}
                  media="(min-width: 768px)"
                />
              );
            })}
            {mobileSources.map((source, index) => {
              const { type, srcSet, sizes } = source;
              return (
                <source
                  key={index}
                  type={type}
                  srcSet={srcSet}
                  sizes={sizes}
                  media="(max-width: 767px)"
                />
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
      <Content hasTOC>
        <header>
          <h1 id="introduction">{title}</h1>
        </header>
        <section>
          <MDX body={body} />
        </section>
      </Content>
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
      <MorePosts data={data.allMdx} />
    </Page>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostHeroLayoutBySlug($id: String) {
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
        invertHeaderColor
        updatedDate(formatString: "MMMM DD, YYYY")
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
            description
            tags
          }
        }
      }
    }
  }
`;
