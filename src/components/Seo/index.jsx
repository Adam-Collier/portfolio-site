import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import config from '../../config';

import SchemaOrg from './schema-org';

function SEO({ description, image, title, pathname, isBlogPost, published }) {
  const { author } = config;

  const siteTitle = config.title;

  // if its conditional make it clear it's from the config
  const seoTitle = title || siteTitle;
  const seoImage = image || config.openGraph.image;
  const seoDescription = description || config.description;

  const canonical = `${config.siteUrl}${pathname}`;

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        {/* General tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index,follow" />
        <meta
          name="google-site-verification"
          content="kXoBZ3JPl4ac52Th5S3Jocx7XmmfMJZNQtkPTJZU4l8"
        />
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <meta name="image" content={seoImage} />
        <link rel="canonical" href={canonical} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={canonical} />
        {isBlogPost && <meta property="og:type" content="article" />}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content={author.name} />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />
      </Head>
      {/* <SchemaOrg
        isBlogPost={isBlogPost}
        url={canonical}
        title={seoTitle}
        image={image}
        description={seoDescription}
        datePublished={published}
        canonicalUrl={canonical}
        author={seoTitle}
        organization={site.siteMetadata.organization}
        defaultTitle={siteTitle}
      /> */}
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
