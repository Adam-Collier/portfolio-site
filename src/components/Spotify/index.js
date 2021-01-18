import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Track from './Track';

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
            album {
              id
              images {
                height
                url
                width
              }
            }
            external_urls {
              spotify
            }
            remoteImage {
              childImageSharp {
                fluid(maxWidth: 72) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  `);

  return (
    <>
      <p>
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
