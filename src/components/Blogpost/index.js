import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

import styles from './blogpost.module.css';
import { timeline as timelineStyles } from './timeline.module.css';

const Blogpost = ({ node, isTimeline }) => {
  const { frontmatter, fields } = node;
  const { title, date, slug } = fields;
  const { description, thumbnail, excerpt } = frontmatter;

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
          <GatsbyImage image={childImageSharp.gatsbyImageData} alt={title} />
        )}
        <section>
          {!isTimeline && <small>{date}</small>}
          <h2>{title}</h2>
          <p>{excerpt || description}</p>
        </section>
      </Link>
    </article>
  );
};

export default React.memo(Blogpost);
