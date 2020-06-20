import React from "react"
import Blogpost from "../Blogpost"

import blogStyles from "../../pages/blog.module.scss"
import styles from "./moreposts.module.scss"

import { useStaticQuery, graphql } from "gatsby"

const Index = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 3
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

  console.log(data)

  return (
    <div className={styles.morePosts}>
      <h4>More posts</h4>
      <div className={blogStyles.blogposts}>
        {data.allMarkdownRemark.edges.map(({ node }, i) => (
          <Blogpost node={node} key={i} />
        ))}
      </div>
    </div>
  )
}

export default Index
