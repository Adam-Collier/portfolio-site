import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Blogpost from "../components/Blogpost"
import Sidebar from "../components/Sidebar"
import MorePosts from "../components/MorePosts"

import styles from "./layout.module.scss"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { tableOfContents } = post

  return (
    <Layout
      location={location}
      title={siteTitle}
      container="fluid"
      className={`${styles.blogpost}`}
    >
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <Sidebar className={styles.sidebar} title="Table of Contents">
        <div
          className={styles.tableOfContents}
          dangerouslySetInnerHTML={{ __html: tableOfContents }}
        ></div>
      </Sidebar>
      <article className={styles.content}>
        <header>
          <h1>{post.frontmatter.title}</h1>
        </header>
        {post.frontmatter.featuredImage && (
          <Image
            style={{
              marginBottom: "2rem",
            }}
            sizes={post.frontmatter.featuredImage.childImageSharp.sizes}
          />
        )}
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
      <MorePosts />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        featuredImage {
          childImageSharp {
            sizes(maxWidth: 720, quality: 90, toFormat: JPG) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "/blog/" }
        fields: { slug: { ne: $slug } }
        frontmatter: { published: { eq: true } }
      }
    ) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`
