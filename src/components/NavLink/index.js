import React from 'react';
import { Link } from 'gatsby';

import styles from './navlink.module.css';

const index = ({ children, to }) => (
  <Link to={to} className={styles.link} activeClassName={styles.active}>
    {children}
  </Link>
);

export default index;
