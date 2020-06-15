import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Resource from "../components/Resource"
import Sidebar from "../components/Sidebar"

import styles from "../templates/template.module.scss"

const ResourceTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout
      location={location}
      title={siteTitle}
      container="fluid"
      className={styles.resources}
    >
      <SEO
        title="resources page"
        description={post.frontmatter.description || post.excerpt}
      />

      <Sidebar
        title="Resources"
        data={data}
        description="This is a group of resources I have either learned something from or thought could become useful in the future."
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
        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </article>
    </Layout>
  )
}

export default ResourceTemplate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fileAbsolutePath: { regex: "/resources/a/" }) {
      id
      excerpt(pruneLength: 160)
      fields {
        slug
      }
      html
      frontmatter {
        title
        icon {
          publicURL
        }
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
            icon {
              publicURL
            }
          }
        }
      }
    }
  }
`
