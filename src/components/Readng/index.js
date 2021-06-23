import React from 'react';
import { Check, BookOpen } from 'react-feather';
import Text from '../Text';
import styles from './readng.module.css';

const Readng = ({ data }) => {
  const { reading, read } = data;

  return (
    <div>
      <Book data={reading} />
      {read.map((d, index) => (
        <Book data={d} key={index} finished />
      ))}
    </div>
  );
};

const Book = ({ data, finished }) => {
  const { title, creator, link } = data;

  const finishedClass = finished ? styles.finished : null;

  return (
    <a
      href={link}
      className={`${styles.book} ${finishedClass}`}
      target="__blank"
      rel="noopener noreferrer"
    >
      <Text>{title}</Text>
      <Text color="foreground-high" size="sm">
        {creator}
      </Text>

      <div className={styles.icon}>
        {finished ? (
          <Check size={14} alt="book has been read" />
        ) : (
          <BookOpen size={14} alt="currently reading" />
        )}
      </div>
    </a>
  );
};

export default Readng;
