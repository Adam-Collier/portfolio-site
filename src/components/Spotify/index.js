import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Track from './Track';
import { intro } from './track.module.css';

const TopTracks = () => {
  const { allTopTracks } = useStaticQuery(graphql`
    {
      allTopTracks(limit: 10) {
        edges {
          node {
            id
            artists {
              id
              name
            }
            name
            external_urls {
              spotify
            }
            remoteImage {
              childImageSharp {
                gatsbyImageData(
                  width: 72
                  layout: CONSTRAINED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  `);

  return (
    <>
      <p className={intro}>
        Wondering what music I’m loving right now? Here’s my top tracks from
        Spotify.
      </p>
      {allTopTracks.edges.map(({ node }) => (
        <Track track={node} />
      ))}
    </>
  );
};

export default TopTracks;
