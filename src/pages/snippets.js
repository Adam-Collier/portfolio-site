import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Sidebar from "../components/Sidebar"

import styles from "./snippets.module.scss"

const Snippets = ({ data }) => {
  const { html, tableOfContents } = data.markdownRemark
  return (
    <Layout container="fluid" className={styles.snippets}>
      <SEO title="Snippets page" />
      <Sidebar>
        <p>
          There's nothing worse than almost remembering a bit of code you saw on
          stackoverflow on in a blogpost once. So I've collated all of the ones
          I find most useful.
        </p>

        <div dangerouslySetInnerHTML={{ __html: tableOfContents }}></div>
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
    markdownRemark(fileAbsolutePath: { regex: "/snippets/" }) {
      html
      tableOfContents
    }
  }
`

export default Snippets
