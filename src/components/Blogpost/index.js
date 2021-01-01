import React from 'react';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

import styles from './blogpost.module.css';
import { timeline as timelineStyles } from './timeline.module.css';

const Blogpost = ({ node, isTimeline }) => {
  const { frontmatter, fields, excerpt } = node;
  const { title, date, slug } = fields;
  const { description, thumbnail } = frontmatter;

  const { childImageSharp, extension, publicURL } = thumbnail;

  const timelineClass = isTimeline ? timelineStyles : null;

  return (
    <article className={`${styles.blogpost} ${timelineClass}`} key={slug}>
      <Link to={slug} aria-label={`blog post: ${title}`}>
        {extension === 'mp4' ? (
          <video autoPlay loop muted playsInline>
            <source src={publicURL} type="video/mp4" />
          </video>
        ) : (
          <Image fluid={childImageSharp.fluid} alt={title} />
        )}
        <section>
          {!isTimeline && <small>{date}</small>}
          <h2>{title}</h2>
          <p>{description || excerpt}</p>
        </section>
      </Link>
    </article>
  );
};

export default React.memo(Blogpost);
