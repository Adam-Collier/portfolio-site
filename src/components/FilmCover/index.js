import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styles from './film-cover.module.css';

const FilmCover = ({ cover, title, year, genre, rating = 1, className }) => {
  const { allFile } = useStaticQuery(graphql`
    {
      allFile(filter: { absolutePath: { regex: "/cover/" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(
                width: 128
                quality: 90
                formats: [AUTO, WEBP, AVIF]
                layout: CONSTRAINED
              )
            }
            base
          }
        }
      }
    }
  `);

  const { node: filmCover } = allFile.edges.filter(({ node }) =>
    cover.includes(node.base)
  )[0];

  return (
    <div className={`${className} ${styles.cover}`}>
      <div>
        <GatsbyImage
          image={filmCover.childImageSharp.gatsbyImageData}
          className={styles.image}
          alt={`${title} film cover`}
          sizes="(max-width: 600px) 128px, 135px"
        />
      </div>
      <p className={styles.genre}>{genre}</p>
      <p className={styles.year}>{year}</p>
      <div className={styles.rating}>
        <div className={styles.stars} style={{ width: `${rating * 20}%` }}>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
          <span>★</span>
        </div>
      </div>
    </div>
  );
};

export default FilmCover;
