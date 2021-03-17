import React from 'react';
import { Link } from 'gatsby';
import { ArrowRight } from 'react-feather';

import styles from './resource-card.module.css';

const index = ({ node }) => {
  const { title, description } = node.frontmatter;
  const { slug } = node.fields;

  return (
    <Link to={slug} className={styles.resourceCard} aria-label={title}>
      <article key={slug}>
        <div>
          <h3>{title}</h3>
          <ArrowRight size={16} />
        </div>
        <p>{description}</p>
      </article>
    </Link>
  );
};

export default index;
