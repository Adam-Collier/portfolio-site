import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import styles from './blogpost.module.css';

const Blogpost = ({ node }) => {
  const { frontmatter, fields } = node;
  const { title, date, slug } = fields;
  const { description, thumbnail } = frontmatter;

  const { childImageSharp, extension, publicURL } = thumbnail;

  return (
    <article className={styles.blogpost} key={slug}>
      <Link to={slug} aria-label={`blog post: ${title}`}>
        {extension === 'mp4' ? (
          <video autoPlay loop muted playsInline>
            <source src={publicURL} type="video/mp4" />
          </video>
        ) : (
          <GatsbyImage image={childImageSharp.gatsbyImageData} alt={title} />
        )}
        <section>
          <h2>{title}</h2>
          <p>{description}</p>
          <small>{date}</small>
        </section>
      </Link>
    </article>
  );
};

export default React.memo(Blogpost);
