import React from "react"
import Blogpost from "../Blogpost"
import styles from "./moreposts.module.css"

import { useStaticQuery, graphql } from "gatsby"

const Index = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 2
        filter: {
          fileAbsolutePath: { regex: "/blog/" }
          frontmatter: { published: { eq: true } }
        }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
              title
              thumbnail {
                childImageSharp {
                  fluid(maxWidth: 114, quality: 90, toFormat: JPG) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              tags
            }
          }
        }
      }
    }
  `)

  return (
    <div className={styles.morePosts}>
      <h4>More posts</h4>
      <div className={styles.blogposts}>
        {data.allMarkdownRemark.edges.map(({ node }, i) => (
          <Blogpost node={node} key={i} />
        ))}
      </div>
    </div>
  )
}

export default Index
