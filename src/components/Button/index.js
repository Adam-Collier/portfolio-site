import React from 'react';

import styles from './button.module.css';

const ConditionalWrapper = ({ link, children }) =>
  link ? (
    <a
      href={link}
      className={styles.link}
      target="__blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    children
  );

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
