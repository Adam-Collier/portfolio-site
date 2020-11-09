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
  const { frontmatter, body, fields } = post
  const { title, date } = fields
  const { description, excerpt, featured, tags } = frontmatter

  let { tableOfContents, timeToRead } = post

  const image = post.frontmatter.image
    ? post.frontmatter.image.childImageSharp.resize
    : null

  return (
    <Layout
      location={location}
      title={siteTitle}
      containerType="fluid"
      containerClass={`${styles.blogpost}`}
    >
      <SEO title={title} description={description || excerpt} image={image} />
      <Sidebar className={styles.sidebar} description={description}>
        {Object.keys(tableOfContents).length !== 0 && (
          <TableOfContents
            tableOfContents={tableOfContents}
            location={location}
          />
        )}

        <span>Written</span>
        <div className={styles.written}>
          <p>{date}</p>
          <p>{timeToRead} minute read</p>
        </div>

        <span>Tags</span>
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
        {featured && (
          <Image
            style={{
              marginBottom: "2rem",
            }}
            sizes={featured.childImageSharp.sizes}
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
      fields {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      frontmatter {
        tags
        description
        featured {
          childImageSharp {
            sizes(maxWidth: 720, quality: 90, toFormat: JPG) {
              ...GatsbyImageSharpSizes_withWebp
            }
          }
        }
        image: featured {
          childImageSharp {
            resize(width: 1200) {
              src
              height
              width
            }
          }
        }
      }
    }
  }
`
