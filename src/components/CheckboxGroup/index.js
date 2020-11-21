import React from 'react';
import { nanoid } from 'nanoid';

import styles from './checkboxgroup.module.css';

const CheckBox = ({ text }) => {
  const id = nanoid();
  return (
    <div className={styles.checkbox}>
      <label htmlFor={id}>
        <input type="checkbox" name={id} id={id} />
        {text}
      </label>
    </div>
  );
};

const CheckboxGroup = ({ textArr }) => (
  <div className={styles.checkboxGroup}>
    {textArr.map((text) => (
      <CheckBox text={text} />
    ))}
  </div>
);

export default CheckboxGroup;
