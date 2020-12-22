/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import SchemaOrg from './schema-org';

function SEO({
  description,
  lang,
  image: customImage,
  title,
  pathname,
  isBlogPost,
  published,
}) {
  const { site, file } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            keywords
            siteUrl
            organization {
              name
              url
              logo
            }
          }
        }
        file(relativePath: { eq: "meta-image.jpg" }) {
          childImageSharp {
            original {
              width
              height
              src
            }
          }
        }
      }
    `
  );

  const defaultImage = file.childImageSharp.original;

  const metaTitle = title || site.siteMetadata.title;
  const metaImage = customImage || defaultImage;

  const metaDescription = description || site.siteMetadata.description;

  const image =
    metaImage && metaImage.src
      ? `${site.siteMetadata.siteUrl}${metaImage.src}`
      : null;

  const canonical = pathname ? `${site.siteMetadata.siteUrl}${pathname}` : null;

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang,
        }}
        title={title}
        defaultTitle={site.siteMetadata.title}
        titleTemplate={`%s | ${site.siteMetadata.title}`}
      >
        {/* General tags */}
        <meta name="googlebot" content="index,follow" />
        <meta
          name="google-site-verification"
          content="kXoBZ3JPl4ac52Th5S3Jocx7XmmfMJZNQtkPTJZU4l8"
        />
        <meta name="description" content={metaDescription} />
        <meta name="image" content={image} />
        <link rel="canonical" href={canonical} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={canonical} />
        {isBlogPost && <meta property="og:type" content="article" />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={site.siteMetadata.author} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={image} />
      </Helmet>
      <SchemaOrg
        isBlogPost={isBlogPost}
        url={canonical}
        title={metaTitle}
        image={image}
        description={metaDescription}
        datePublished={published}
        canonicalUrl={canonical}
        author={site.siteMetadata.title}
        organization={site.siteMetadata.organization}
        defaultTitle={site.siteMetadata.title}
      />
    </>
  );
}

SEO.defaultProps = {
  lang: `en`,
  description: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default SEO;
