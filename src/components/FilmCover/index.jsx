/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Stack from '../Stack';
import Text from '../Text';
import s from './film-cover.module.css';

const FilmCover = ({ title, year, genre, rating = 1, className, cover }) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Stack gap={0.25} className={`${className} ${s.cover}`}>
      <Image
        src={require(`/_posts/${slug}/covers/${cover}.jpg`)}
        className={s.image}
        alt={title ? `${title} film cover` : `film cover`}
        sizes="(max-width: 600px) 128px, 135px"
        width={120}
        height={180}
      />
      <Text
        size="xs"
        lineHeight={1.45}
        color="foreground-high"
        className={s.genre}
      >
        {genre}
      </Text>
      <Text
        size="xs"
        lineHeight={1.45}
        color="foreground-high"
        className={s.year}
      >
        {year}
      </Text>
      <div className={s.rating}>
        <div className={s.stars} style={{ width: `${rating * 20}%` }}>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>
    </Stack>
  );
};

export default FilmCover;
