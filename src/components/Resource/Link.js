import React from 'react';
import { Link } from 'gatsby';

import { ArrowRight } from 'react-feather';

import styles from './resource.module.css';

const index = ({ node, currentPageId }) => {
  const { id } = node;
  const { title } = node.frontmatter;
  const { slug } = node.fields;

  return (
    <Link
      to={slug}
      className={`${styles.resourceLink} ${
        currentPageId === id ? styles.active : ''
      }`}
      aria-label={title}
    >
      <article key={slug}>
        <h3>{title}</h3>
        {currentPageId === id ? <ArrowRight size={16} /> : null}
      </article>
    </Link>
  );
};

export default index;
