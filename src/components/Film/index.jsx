import React from 'react';
import s from './film.module.css';
import Stack from '../Stack';
import Text from '../Text';
import FilmCover from '../FilmCover';

const Film = ({ cover, title, year, children, genre, rating = 1 }) => (
  <section gap={1.45} className={s.film}>
    <FilmCover
      className={s.cover}
      cover={cover}
      title={title}
      year={year}
      genre={genre}
      rating={rating}
    />
    <Stack gap={1}>
      <Text as="h2" className={s.title} size="xl" heading>
        {title}
      </Text>
      {children}
    </Stack>
  </section>
);

export default Film;
