import React from "react"
import Layout from "../components/Layout"
import SEO from "../components/seo"

import styles from "./now.module.scss"

const Now = ({ data }) => {
  const { markdownRemark } = data
  const { html } = markdownRemark
  return (
    <Layout className={styles.now} container="fluid">
      <SEO title="Now page" />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export default Now

export const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/pages/now.md/" }) {
      html
    }
  }
`
