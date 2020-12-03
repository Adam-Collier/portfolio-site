import React from 'react';
import { Link } from 'gatsby';

import styles from './button.module.css';

const LinkType = ({ link, children }) =>
  link.includes('https://') ? (
    <a
      href={link}
      className={styles.link}
      target="__blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <Link to={link} className={styles.link}>
      {children}
    </Link>
  );

const ConditionalWrapper = ({ link, children }) =>
  link ? <LinkType link={link}>{children}</LinkType> : children;

const Button = ({ text, link, Icon = '' }) => (
  <div>
    <ConditionalWrapper link={link}>
      <button className={styles.button} type="button">
        {Icon && <Icon className={styles.icon} size={16} />}
        {text}
      </button>
    </ConditionalWrapper>
  </div>
);

export default Button;
