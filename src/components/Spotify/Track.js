import React from 'react';
import Image from 'gatsby-image';

import { ArrowUpRight } from 'react-feather';
import styles from './track.module.css';

const Track = ({ track }) => {
  const { id, artists, name, album, external_urls, remoteImage } = track;
  const { images } = album;
  const { spotify: trackUrl } = external_urls;

  const artistNames = artists.map((artist) => artist.name).join(', ');

  return (
    <a
      className={styles.track}
      key={id}
      href={trackUrl}
      target="__blank"
      rel="noopener noreferrer"
    >
      <ArrowUpRight className={styles.arrow} size={18} />
      <Image
        fluid={remoteImage.childImageSharp.fluid}
        className={styles.image}
      />
      <div>
        <p className={styles.trackName}>{name}</p>
        <p className={styles.artist}>{artistNames}</p>
      </div>
    </a>
  );
};

export default Track;
