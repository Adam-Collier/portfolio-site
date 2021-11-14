import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'react-feather';
import s from './track.module.css';
import Stack from '../Stack';
import Text from '../Text';

export const Track = ({ artist, url, title, image }) => (
  <a
    className={s.track}
    key={url}
    href={url}
    target="__blank"
    rel="noopener noreferrer"
  >
    <ArrowUpRight className={s.arrow} size={18} />
    <Image src={image} alt={`${artist}: ${title}`} width={72} height={72} />
    <Stack gap={0.25}>
      <Text className={s.title} weight={500} truncate={1} lineHeight={1.3}>
        {title}
      </Text>
      <Text weight={400} size="sm" color="foreground-max" truncate={2}>
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
