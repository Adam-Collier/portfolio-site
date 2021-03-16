import React from 'react';
import styles from './content.module.css';

const Content = ({ children, className, hasTOC }) => (
  <article
    className={`${styles.content} ${hasTOC ? styles.hasTOC : ''} ${
      className || ''
    }`}
  >
    {children}
  </article>
);

export default Content;
