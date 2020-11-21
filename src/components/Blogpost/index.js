import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

import styles from './blogpost.module.css';

const Index = ({ node }) => {
  const { frontmatter, fields } = node;
  const { title, date } = fields;
  const { description, thumbnail } = frontmatter;
  const { slug } = node.fields;

  const { childImageSharp, extension, publicURL } = thumbnail;

  return (
    <Link
      to={slug}
      className={`${styles.blogpost}`}
      aria-label={`blog post: ${title}`}
      key={slug}
    >
      <article>
        {extension === 'mp4' ? (
          <video autoPlay loop muted playsInline>
            <source src={publicURL} type="video/mp4" />
          </video>
        ) : (
          <Image fluid={childImageSharp.fluid} alt={title} />
        )}
        <section>
          <small>{date}</small>
          <h2>{title}</h2>
          <p>{description || node.excerpt}</p>
        </section>
      </article>
    </Link>
  );
};

export default Index;
