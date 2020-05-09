import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"

import styles from "./blogpost.module.scss"

const Index = ({ node, noThumbnail }) => {
  const { title, date, description, thumbnail } = node.frontmatter
  const { slug } = node.fields

  return (
    <Link
      to={slug}
      className={`${styles.blogpost} ${noThumbnail ? styles.noThumbnail : ""}`}
    >
      <article key={slug}>
        {!noThumbnail && (
          <Image fixed={thumbnail.childImageSharp.fixed} alt={title} />
        )}
        <section>
          <small>{date}</small>
          <h3>{title}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: description || node.excerpt,
            }}
          />
        </section>
      </article>
    </Link>
  )
}

export default Index
