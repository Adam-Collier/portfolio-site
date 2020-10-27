import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import MDX from "../components/MDX"
import Layout from "../components/Layout"
import SEO from "../components/seo"
import Sidebar from "../components/Sidebar"
import MorePosts from "../components/MorePosts"
import TableOfContents from "../components/TableOfContents"

// import styles from "./blog-post.module.css"

import styles from "./blog-post-hero-layout.module.css"

const BlogPostTemplate = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const post = data.mdx
  const { frontmatter, body, fields } = post
  const { title, date } = fields
  const {
    description,
    excerpt,
    featured,
    mobileFeatured,
    tags,
    invertHeaderColor,
  } = frontmatter

  let { tableOfContents, timeToRead } = post

  useEffect(() => {
    let wrapper = document.querySelector(`.${styles.wrapper}`)
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log(true)
            invertHeaderColor
              ? wrapper.style.setProperty("--header-color", "white")
              : wrapper.style.setProperty("--header-color", "#333333")
            wrapper.style.setProperty("--header-background", "none")
          } else {
            wrapper.style.setProperty(
              "--header-color",
              "var(--primary-foreground)"
            )
            wrapper.style.setProperty(
              "--header-background",
              "var(--primary-background)"
            )
          }
        })
      },
      {
        rootMargin: `-24px 0% 0% 0%`,
      }
    )

    observer.observe(document.querySelector(`.${styles.heroWrapper}`))

    return () => {
      observer.unobserve(document.querySelector(`.${styles.heroWrapper}`))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const image = post.frontmatter.image
    ? post.frontmatter.image.childImageSharp.resize
    : null

  let featuredSources = [
    mobileFeatured.childImageSharp.fluid,
    {
      ...featured.childImageSharp.fluid,
      media: `(min-width: 768px)`,
    },
  ]

  return (
    <Layout
      location={location}
      title={siteTitle}
      containerType="fluid"
      wrapperClass={styles.wrapper}
      containerClass={`${styles.blogpost}`}
    >
      <SEO title={title} description={description || excerpt} image={image} />
      <div className={styles.heroWrapper}>
        <Image fluid={featuredSources} />
      </div>
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
  query BlogPostHeroLayoutBySlug($id: String) {
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
        invertHeaderColor
        featured {
          childImageSharp {
            fluid(maxWidth: 1920, maxHeight: 800, quality: 90, toFormat: JPG) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        mobileFeatured: featured {
          childImageSharp {
            fluid(maxWidth: 768, maxHeight: 650, quality: 90, toFormat: JPG) {
              ...GatsbyImageSharpFluid_withWebp
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
