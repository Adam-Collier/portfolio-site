import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Track from './Track';

const TopTracks = () => {
  const { allTopTracks } = useStaticQuery(graphql`
    {
      allTopTracks(limit: 5) {
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

  return allTopTracks.edges.map(({ node }, index) => (
    <Track track={node} key={index} />
  ));
};

export default TopTracks;
