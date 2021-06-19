import React from 'react';
import Image from 'next/image';
// import useSWR from 'swr';
import { ArrowUpRight } from 'react-feather';
// import fetcher from '../../lib/fetcher';/
import s from './track.module.css';
import Stack from '../Stack';
import Text from '../Text';

const Track = ({ artist, url, title, image }) => (
  <a
    className={s.track}
    key={url}
    href={url}
    target="__blank"
    rel="noopener noreferrer"
  >
    <ArrowUpRight className={s.arrow} size={18} />
    <Image src={image} width={72} height={72} />
    <Stack gap={0.25}>
      <Text
        className={s.title}
        weight={500}
        truncate={1}
        lineHeight={1.3}
        color="primary-foreground"
      >
        {title}
      </Text>
      <Text weight={450} size="sm" color="foreground-high">
        {artist}
      </Text>
    </Stack>
  </a>
);

const TopTracks = ({ tracks }) => (
  <Stack gap={0}>
    {tracks.map((track) => (
      <Track key={track.url} {...track} />
    ))}
  </Stack>
);

export default TopTracks;
