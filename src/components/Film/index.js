import React from "react"
import { useStaticQuery } from "gatsby"
import Image from "gatsby-image"
import styles from "./film.module.css"

const Film = ({ cover, title, year, children, genre, rating = 1 }) => {
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
  `)

  let { node: filmCover } = allFile.edges.filter(({ node }) =>
    cover.includes(node.base)
  )[0]

  return (
    <section className={styles.film}>
      <div className={styles.cover}>
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
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.content}>{children}</div>
    </section>
  )
}

export default Film
