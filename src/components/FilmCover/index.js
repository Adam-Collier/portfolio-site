import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import styles from './film-cover.module.css';

const FilmCover = ({ cover, title, year, genre, rating = 1, className }) => {
  const { allFile } = useStaticQuery(graphql`
    {
      allFile(filter: { absolutePath: { regex: "/cover/" } }) {
        edges {
          node {
            childImageSharp {
              fluid(maxWidth: 114, quality: 90, toFormat: JPG) {
                ...GatsbyImageSharpFluid_withWebp
              }
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
      <Image
        className={styles.image}
        fluid={filmCover.childImageSharp.fluid}
        alt={`${title} film cover`}
      />
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
