import React from 'react';
import { Check, BookOpen } from 'react-feather';
import Text from '../Text';
import s from './readng.module.css';

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
  const Icon = finished ? Check : BookOpen;

  return (
    <a
      href={link}
      className={s.book}
      target="__blank"
      rel="noopener noreferrer"
    >
      <Text>{title}</Text>
      <Text color="foreground-high" size="sm">
        {creator}
      </Text>
      <div className={s.icon}>
        <Icon
          size={14}
          alt={finished ? 'book has been read' : 'currently reading'}
        />
      </div>
    </a>
  );
};

export default Readng;
