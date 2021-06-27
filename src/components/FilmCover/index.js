import React from 'react';
// import Image from 'next/image';
import styles from './film-cover.module.css';

const FilmCover = ({
  // imagePath,
  // title,
  year,
  genre,
  rating = 1,
  className,
}) => (
  // const { allFile } = useStaticQuery(graphql`
  //   {
  //     allFile(filter: { absolutePath: { regex: "/cover/" } }) {
  //       edges {
  //         node {
  //           childImageSharp {
  //             gatsbyImageData(
  //               width: 128
  //               quality: 90
  //               formats: [AUTO, WEBP, AVIF]
  //               layout: CONSTRAINED
  //             )
  //           }
  //           base
  //         }
  //       }
  //     }
  //   }
  // `);

  // const { node: filmCover } = allFile.edges.filter(({ node }) =>
  //   cover.includes(node.base)
  // )[0];

  <div className={`${className} ${styles.cover}`}>
    <div>
      {/* <Image
        src={require(imagePath)}
        className={styles.image}
        alt={`${title} film cover`}
        sizes="(max-width: 600px) 128px, 135px"
      /> */}
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
export default FilmCover;
