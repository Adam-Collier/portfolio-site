import React from "react"
import { Link } from "gatsby"

import styles from "./resource.module.scss"

const index = ({ node, currentPageId }) => {
  const { id } = node
  const { title, icon } = node.frontmatter
  const { slug } = node.fields

  return (
    <Link to={slug} className={`${styles.resource}`}>
      <article key={slug} className={currentPageId === id ? styles.active : ""}>
        <img src={icon.publicURL} alt={`${title} icon`} />
        <section>
          <h3>{title}</h3>
        </section>
      </article>
    </Link>
  )
}

export default index