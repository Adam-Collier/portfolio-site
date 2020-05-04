import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import styles from "./commandMenu.module.scss"

const Index = () => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/menu/" }) {
        html
      }
    }
  `)

  const { html } = data.markdownRemark

  return (
    <div
      className={styles.commandMenu}
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  )
}

export default Index
