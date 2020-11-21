import React from 'react';
import { Link } from 'gatsby';

import ArrowIcon from '../../icons/arrow.svg';

import styles from './resource.module.css';

const index = ({ node, currentPageId }) => {
  const { id } = node;
  const { title } = node.frontmatter;
  const { slug } = node.fields;

  return (
    <Link
      to={slug}
      className={`${styles.resource} ${
        currentPageId === id ? styles.active : ''
      }`}
      aria-label={title}
    >
      <article key={slug}>
        <h3>{title}</h3>
        <ArrowIcon />
      </article>
    </Link>
  );
};

export default index;
