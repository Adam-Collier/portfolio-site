import React from 'react';
import styles from './alert.module.css';

export const SuccessAlert = ({ text }) => (
  <p className={styles.success}>{text}</p>
);

export const ErrorAlert = ({ text }) => <p className={styles.error}>{text}</p>;
