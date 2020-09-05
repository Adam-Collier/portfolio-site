import React from "react"

import SearchIcon from "../../icons/search_icon.svg"
import styles from "./search.module.css"

const Index = ({ allPosts, searchedPosts }) => {
  const handleChange = e => {
    let searchValue = e.target.value.toLowerCase()

    const posts = allPosts.filter(({ node }) => {
      if (node.frontmatter.title.toLowerCase().includes(searchValue))
        return node

      return false
    })

    searchedPosts(posts)
  }

  return (
    <div className={styles.search}>
      <SearchIcon />
      <input
        type="search"
        name="search posts"
        id="search"
        onChange={handleChange}
      />
    </div>
  )
}

export default Index
