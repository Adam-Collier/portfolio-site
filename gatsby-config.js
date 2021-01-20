// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Adam Collier`,
    description: `This site is as much for me as it is for you. See what snippets I like to use, what resources I learn from and my thoughts and processes.`,
    author: `@collieradam`,
    siteUrl: `https://adamcollier.co.uk/`,
    image: '/images/meta-image.jpg',
    keywords: ['Adam Collier', 'gatsby', 'blog', 'resources', 'snippets'],
    organization: {
      name: 'Adam Collier',
      url: 'https://adamcollier.co.uk',
      logo: 'images/logo.png',
    },
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyser-v2',
      options: {
        disable: true,
      },
    },
    // `gatsby-plugin-preact`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `spotify-source`,
      options: {
        clientId: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: process.env.READNG_READ,
        name: `ReadngRead`,
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: process.env.READNG_WANT_TO_READ,
        name: `ReadngWantToRead`,
      },
    },
    {
      resolve: `gatsby-source-rss-feed`,
      options: {
        url: process.env.READNG_CURRENTLY_READING,
        name: `ReadngCurrentlyReading`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `115`,
              icon: false,
            },
          },
          `resource-format`,
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `${__dirname}/content`,
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `webp`],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              maxWidth: 740,
              withWebp: true,
              quality: 90,
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Adam Collier`,
        short_name: `Adam Collier`,
        start_url: `/`,
        lang: `en`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/icons/icon.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /icons/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              offsetY: `115`,
              icon: false,
            },
          },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noopener noreferrer',
            },
          },
          {
            resolve: require.resolve(`./plugins/resource-format`),
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `${__dirname}/content`,
              ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `webp`],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
              maxWidth: 596,
              withWebp: true,
              quality: 90,
              srcSetBreakpoints: [200, 360, 414, 720, 828],
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-remark-images`,
      options: {
        linkImagesToOriginal: false,
        maxWidth: 596,
        withWebp: true,
        quality: 90,
        srcSetBreakpoints: [330, 360, 414, 660, 720, 828],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-0V49RDSEMJ', // Google Tracking ID / GA
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) =>
              allMdx.edges.map((edge) => {
                const { node } = edge;
                const { frontmatter, fields, html } = node;
                const { slug, title, date } = fields;
                const { thumbnail, category, description } = frontmatter;
                return {
                  title,
                  description,
                  date,
                  url: site.siteMetadata.siteUrl + slug,
                  guid: site.siteMetadata.siteUrl + slug,
                  categories: [category],
                  enclosure: thumbnail && {
                    url: site.siteMetadata.siteUrl + thumbnail.publicURL,
                  },
                  custom_elements: [{ 'content:encoded': html }],
                };
              }),
            query: `
              {
                allMdx(sort: {fields: [fields___date], order: DESC}, filter: {fileAbsolutePath: {regex: "/blog/"}, frontmatter: {published: {eq: true}}}) {
                  edges {
                    node {
                      html
                      fields {
                        title
                        date
                        slug
                      }
                      frontmatter {
                        description
                        category
                        thumbnail{
                          publicURL
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: '/blog/rss.xml',
            title: "Adam Collier's RSS Feed",
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
