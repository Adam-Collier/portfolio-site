import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Resource from "../components/Resource"
import Sidebar from "../components/Sidebar"

import styles from "./layout.module.scss"

const ResourceTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout
      location={location}
      title={siteTitle}
      containerType="fluid"
      containerClass={styles.resources}
    >
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />

      <Sidebar
        title="Resources"
        data={data}
        description="This is a group of resources I have either learned something from or thought could become useful in the future."
        searchContext="Categories"
        className={styles.resourceSidebar}
      >
        {({ searchPosts }) =>
          searchPosts.map(({ node }, i) => (
            <Resource node={node} key={i} currentPageId={post.id} />
          ))
        }
      </Sidebar>

      <article className={styles.content}>
        <header>
          <h1>{post.frontmatter.title}</h1>
        </header>
        {post.frontmatter.featuredImage && (
          <Image
            style={{
              marginBottom: "2rem",
              borderRadius: "5px",
            }}
            sizes={post.frontmatter.featuredImage.childImageSharp.sizes}
          />
        )}
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </Layout>
  )
}

export default ResourceTemplate

export const pageQuery = graphql`
  query ResourceBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      fields {
        slug
      }
      html
      frontmatter {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___title], order: ASC }
      filter: { fileAbsolutePath: { regex: "/resources/" } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 400)
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
