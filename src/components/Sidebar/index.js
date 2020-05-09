import React, { useState } from "react"
import Search from "../Search"

import styles from "./sidebar.module.scss"

const Index = ({ children, title, data = "" }) => {
  const allPosts = data ? data.allMarkdownRemark.edges : ""
  const [searchPosts, setSearchPosts] = useState(allPosts)
  const searchedPosts = posts => {
    setSearchPosts(posts)
  }

  return (
    <div className={styles.sidebar}>
      <div>
        {data && (
          <div className={styles.bar}>
            <h4>{title}</h4>
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
