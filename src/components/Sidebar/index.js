import React, { useState } from "react"
import Search from "../Search"

import styles from "./sidebar.module.scss"

const Index = ({ children, title, data = "", className, description }) => {
  const allPosts = data ? data.allMarkdownRemark.edges : ""
  const [searchPosts, setSearchPosts] = useState(allPosts)
  const searchedPosts = posts => {
    setSearchPosts(posts)
  }

  return (
    <div className={`${className ? className : ""} ${styles.sidebar}`}>
      <div>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
        {data && (
          <div className={styles.bar}>
            <h4>Categories</h4>
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
