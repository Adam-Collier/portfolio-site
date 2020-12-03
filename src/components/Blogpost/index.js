import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

import styles from './blogpost.module.css';

const Index = ({ node, timeline }) => {
  const { frontmatter, fields, excerpt } = node;
  const { title, date, slug } = fields;
  const { description, thumbnail } = frontmatter;

  const { childImageSharp, extension, publicURL } = thumbnail;

  return (
    <Link
      to={slug}
      className={`${styles.blogpost} ${timeline ? styles.timeline : ''}`}
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
          {!timeline && <small>{date}</small>}
          <h2>{title}</h2>
          <p>{description || excerpt}</p>
        </section>
      </article>
    </Link>
  );
};

export default Index;
