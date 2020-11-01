import React from "react"
import styles from "./film.module.css"
import FilmCover from "../FilmCover"

const Film = ({ cover, title, year, children, genre, rating = 1 }, props) => {
  return (
    <section className={styles.film}>
      <FilmCover
        className={styles.cover}
        cover={cover}
        title={title}
        year={year}
        genre={genre}
        rating={rating}
      />
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </section>
  )
}

export default Film
