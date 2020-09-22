import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import MDX from "../components/MDX"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import Sidebar from "../components/Sidebar"
import MorePosts from "../components/MorePosts"
import TableOfContents from "../components/TableOfContents"

import styles from "./blog-post.module.css"

const BlogPostTemplate = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const post = data.mdx
  const { frontmatter, body } = post
  const { description, excerpt, title, featuredImage, date, tags } = frontmatter

  let { tableOfContents, timeToRead } = post

  return (
    <Layout
      location={location}
      title={siteTitle}
      containerType="fluid"
      containerClass={`${styles.blogpost}`}
    >
      <SEO title={title} description={description || excerpt} />
      <Sidebar
        className={styles.sidebar}
        title="Table of Contents"
        description={description}
      >
        {Object.keys(tableOfContents).length !== 0 && (
          <TableOfContents
            tableOfContents={tableOfContents}
            location={location}
          />
        )}

        <h4>Written</h4>
        <div className={styles.written}>
          <p>{date}</p>
          <p>{timeToRead} minute read</p>
        </div>

        <h4>Tags</h4>
        <div className={styles.tags}>
          {tags.map((tag, index) => (
            <div key={index}>{tag}</div>
          ))}
        </div>
      </Sidebar>
      <article className={styles.content}>
        <header>
          <h1 id="introduction">{title}</h1>
        </header>
        {featuredImage && (
          <Image
            style={{
              marginBottom: "2rem",
            }}
            sizes={featuredImage.childImageSharp.sizes}
          />
        )}
        <section>
          <MDX body={body} />
        </section>
      </article>
      <MorePosts />
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
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
