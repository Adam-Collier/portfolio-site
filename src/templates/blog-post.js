import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Sidebar from "../components/Sidebar"
import MorePosts from "../components/MorePosts"

import styles from "./layout.module.scss"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const post = data.markdownRemark
  const {
    description,
    excerpt,
    title,
    featuredImage,
    date,
    tags,
  } = post.frontmatter
  let { html, tableOfContents, timeToRead } = post

  if (tableOfContents) {
    tableOfContents =
      tableOfContents.slice(0, 4) +
      `<li>
        <a href="${location.pathname}#intro">Introduction</a>
       </li>` +
      tableOfContents.slice(4)
  }

  console.log(location)

  return (
    <Layout
      location={location}
      title={siteTitle}
      container="fluid"
      className={`${styles.blogpost}`}
    >
      <SEO title={title} description={description || excerpt} />
      <Sidebar
        className={styles.sidebar}
        title="Table of Contents"
        description={description}
      >
        {tableOfContents && (
          <>
            <h4>Table of Contents</h4>
            <ul
              className={styles.tableOfContents}
              dangerouslySetInnerHTML={{ __html: tableOfContents }}
            ></ul>
          </>
        )}

        <h4>Written</h4>
        <div className={styles.written}>
          <p>{date}</p>
          <p>{timeToRead} minute read</p>
        </div>

        <h4>Tags</h4>
        <div className={styles.tags}>
          {tags.map(tag => (
            <div>{tag}</div>
          ))}
        </div>
      </Sidebar>
      <article className={styles.content}>
        <header>
          <h1 id="intro">{title}</h1>
        </header>
        {featuredImage && (
          <Image
            style={{
              marginBottom: "2rem",
            }}
            sizes={featuredImage.childImageSharp.sizes}
          />
        )}
        <section dangerouslySetInnerHTML={{ __html: html }} />
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
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        tags
        description
        featuredImage {
          childImageSharp {
            sizes(maxWidth: 720, quality: 90, toFormat: JPG) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
      }
    }
  }
`
