import React from 'react';
import styles from './content.module.css';

const Content = ({ children }) => (
  <article className={styles.content}>{children}</article>
);

export default Content;
