import React from "react"

import styles from "./search.module.scss"

const Index = ({ allPosts, searchedPosts }) => {
  const handleChange = e => {
    let searchValue = e.target.value.toLowerCase()

    const posts = allPosts.filter(({ node }) => {
      if (node.frontmatter.title.toLowerCase().includes(searchValue))
        return node
    })

    searchedPosts(posts)
  }

  return (
    <input
      className={styles.search}
      type="search"
      name="search posts"
      id="search"
      onChange={handleChange}
    />
  )
}

export default Index
