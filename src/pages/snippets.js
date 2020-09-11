import React from "react"
import { graphql } from "gatsby"

import MDX from "../components/MDX"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import Sidebar from "../components/Sidebar"
import TableOfContents from "../components/TableOfContents"

import styles from "./snippets.module.css"

const Snippets = ({ data, location }) => {
  let { edges } = data.allMdx

  let concatTableOfContents = edges.reduce((acc, { node }) => {
    acc.push(node.tableOfContents)
    return acc
  }, [])

  let allTableOfContents = { items: [...concatTableOfContents] }

  return (
    <Layout containerType="fluid" containerClass={styles.snippets}>
      <SEO title="Snippets" />
      <Sidebar
        className={styles.sidebar}
        title="Snippets"
        description="There's nothing worse than almost remembering a bit of code you saw on
          stackoverflow on in a blogpost once. So I've collated all of the ones
          I find most useful."
      >
        <TableOfContents
          tableOfContents={allTableOfContents}
          location={location}
          className={styles.tableOfContents}
        />
      </Sidebar>
      <div className={styles.content}>
        {edges.map(({ node }, index) => {
          let { body } = node

          return <MDX key={index} body={body} />
        })}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMdx(
      filter: { fileAbsolutePath: { regex: "/snippets/" } }
      sort: { fields: fields___slug }
    ) {
      edges {
        node {
          body
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
