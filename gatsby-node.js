/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const blogPostHeroLayout = path.resolve(
    `./src/templates/blog-post-hero-layout.js`
  )

  const result = await graphql(
    `
      {
        blog: allMdx(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
          filter: {
            fileAbsolutePath: { regex: "/blog/" }
            frontmatter: { published: { eq: true } }
          }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                layout
              }
            }
          }
        }
        resources: allMdx(
          sort: { fields: [frontmatter___title], order: ASC }
          limit: 1000
          filter: { fileAbsolutePath: { regex: "/resources/" } }
        ) {
          edges {
            node {
              id
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
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.blog.edges

  posts.forEach(({ node }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    let layoutComponent =
      node.frontmatter.layout === "hero" ? blogPostHeroLayout : blogPost

    createPage({
      path: node.fields.slug,
      component: layoutComponent,
      context: {
        slug: node.fields.slug,
        id: node.id,
        previous,
        next,
      },
    })
  })

  // Create resource pages
  result.data.resources.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/resource.js`),
      context: {
        slug: node.fields.slug,
        id: node.id,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
