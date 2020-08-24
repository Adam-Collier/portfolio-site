import React, { useState } from "react"
import Search from "../Search"

import styles from "./sidebar.module.css"

const Index = ({
  children,
  title,
  data = "",
  className,
  description,
  searchContext,
}) => {
  const allPosts = data ? data.allMarkdownRemark.edges : ""
  const [searchPosts, setSearchPosts] = useState(allPosts)
  const searchedPosts = posts => {
    setSearchPosts(posts)
  }

  return (
    <div className={`${className ? className : ""} ${styles.sidebar}`}>
      <div className={styles.sticky}>
        <h4 className={styles.title}>{title}</h4>
        {description && <p className={styles.description}>{description}</p>}
        {data && (
          <div className={styles.bar}>
            <h4>{searchContext}</h4>
            <Search allPosts={allPosts} searchedPosts={searchedPosts} />
          </div>
        )}
        <section className={styles.posts}>
          {data ? children({ searchPosts }) : children}
        </section>
      </div>
    </div>
  )
}

export default Index
