/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const blogPostHeroLayout = path.resolve(
    `./src/templates/blog-post-hero-layout.js`
  );

  const result = await graphql(
    `
      {
        blog: allMdx(
          sort: { fields: [fields___date], order: DESC }
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
                layout
              }
            }
          }
        }
        resources: allMdx(
          sort: { fields: fields___title, order: ASC }
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
  );

  if (result.errors) {
    throw result.errors;
  }

  // Create blog posts pages.
  const posts = result.data.blog.edges;

  posts.forEach(({ node }, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    const layoutComponent =
      node.frontmatter.layout === 'hero' ? blogPostHeroLayout : blogPost;

    createPage({
      path: node.fields.slug,
      component: layoutComponent,
      context: {
        slug: node.fields.slug,
        id: node.id,
        previous,
        next,
      },
    });
  });

  // Create resource pages
  result.data.resources.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/resource.js`),
      context: {
        slug: node.fields.slug,
        id: node.id,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    let slug = createFilePath({ node, getNode });

    // blog specific manipulations
    if (slug.includes('/blog/')) {
      const [match] = slug.match(/([0-9]+)-([0-9]+)-([0-9]+)-([a-zA-Z0-9-])*/g);

      const [year, month, day, ...name] = match.split('-');

      slug = `/blog/${name.join('-')}/`;

      const nameWithSpaces = name.join(' ');
      const title =
        nameWithSpaces.charAt(0).toUpperCase() + nameWithSpaces.slice(1);

      const date = new Date(year, month - 1, day);

      createNodeField({
        name: `date`,
        node,
        value: date.toJSON(),
      });

      createNodeField({
        name: `title`,
        node,
        value: title,
      });
    }

    createNodeField({
      name: `slug`,
      node,
      value: slug,
    });
  }
};
