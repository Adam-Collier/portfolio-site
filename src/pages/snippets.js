import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Sidebar from "../components/Sidebar"

import styles from "./snippets.module.scss"

const Snippets = ({ data }) => {
  let { edges } = data.allMarkdownRemark

  let html = edges
    .map(({ node }) => {
      let { html } = node
      return html
    })
    .join("")

  let tableOfContents = edges
    .map(({ node }) => {
      let { tableOfContents, fields } = node
      let { slug } = fields

      return tableOfContents.replace(new RegExp(slug, "g"), "/snippets/")
    })
    .join("")

  return (
    <Layout container="fluid" className={styles.snippets}>
      <SEO title="Snippets page" />
      <Sidebar
        className={styles.sidebar}
        title="Snippets"
        description="There's nothing worse than almost remembering a bit of code you saw on
          stackoverflow on in a blogpost once. So I've collated all of the ones
          I find most useful."
      >
        <div
          className={styles.tableOfContents}
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        ></div>
      </Sidebar>

      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/snippets/" } }
      sort: { fields: fields___slug }
    ) {
      edges {
        node {
          html
          tableOfContents
          fields {
            slug
          }
        }
      }
    }
  }
`

export default Snippets
