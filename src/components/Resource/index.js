import React from "react"
import { Link } from "gatsby"

import styles from "./resource.module.scss"

const index = ({ node, currentPageId }) => {
  const { id } = node
  const { title } = node.frontmatter
  const { slug } = node.fields

  return (
    <Link to={slug} className={`${styles.resource}`}>
      <article key={slug} className={currentPageId === id ? styles.active : ""}>
        <h3>{title}</h3>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.3193 6.42654L19.2207 12L15.3193 17.5735L13.6808 16.4265L16.0794 13H6V11H16.0794L13.6808 7.57347L15.3193 6.42654Z"
            fill={
              currentPageId === id
                ? "var(--primary-accent)"
                : "var(--primary-light-grey)"
            }
          />
        </svg>
      </article>
    </Link>
  )
}

export default index
