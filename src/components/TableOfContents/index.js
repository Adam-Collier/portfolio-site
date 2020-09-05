import React from "react"
import { Link } from "gatsby"
import { useActiveHash } from "./use-active-hash"

import styles from "./tableOfContent.module.css"

export default ({ headings, path }) => {
  const slugify = value =>
    value
      .trim()
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[-]+/g, "-")
      .replace(/[^\w-]+/g, "")

  let ids = headings.map(heading => slugify(heading.value))

  const activeHash = useActiveHash(["introduction", ...ids])

  console.log(activeHash)

  return (
    <>
      <h4>Table of Contents</h4>
      <ul className={styles.tableOfContents}>
        <li
          key="introduction"
          className={"introduction" === activeHash ? styles.active : ""}
        >
          <Link to={`${path}#`}>Introduction</Link>
        </li>
        {headings.map(heading => {
          let slug = slugify(heading.value)
          const isActive = slug === activeHash

          return (
            <li key={heading.value} className={isActive ? styles.active : ""}>
              <Link to={`${path}#${slug}`}>{heading.value}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}
