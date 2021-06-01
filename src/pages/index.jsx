import React from 'react'
import { useRouter } from 'next/router';

import Page from '../components/Page';
import SEO from '../components/Seo';
// import Content from '../components/Content';
// import Spotify from '../components/Spotify';
// import Readng from '../components/Readng';

// import styles from './index.module.css';
// import Blogposts from '../components/Blogposts';

const IndexPage = ({ location }) => {
  const router = useRouter();

  return (
  <Page containerType="fluid" location={router.pathname} noSidebar>
    <SEO
      title=""
      description="Creative UX Designer Developer from Manchester, UK. Creating content to come back to. Discover useful snippets, resources and blogposts."
      pathname={router.pathname}
    />
    {/* <Content className={styles.content}>
      <section className={styles.intro}>
        <h1>Hey, I'm Adam Collier</h1>
        <p style={{ fontSize: '1.25rem', lineHeight: '1.7' }}>
          A designer and developer from Manchester, UK. Instead of the
          traditional portfolio site that never gets updated I wanted to make
          something functional, practical and useful in my day to day. It will
          exist as an ever growing repository of ideas, productivity helpers and
          things I enjoy. Something noteworthy I should add?{' '}
          <a
            href="https://twitter.com/CollierAdam"
            target="_blank"
            rel="noopener noreferrer"
          >
            DM me on Twitter.
          </a>
        </p>
      </section>
      <section>
        <p>
          Looking for the latest blog post? Here’s the latest four I’ve written!
          Check out the <Link to="/blog/">Blog</Link> for more
        </p>
        <Blogposts posts={blogposts} />
      </section>
      <section>
        <p>
          Wondering what music I’m loving right now? Here’s my top tracks from
          my <a href="https://open.spotify.com/user/1134435866">Spotify</a>,
          updated regularly.
        </p>
        <Spotify />
      </section>
      <section>
        <p className={styles.intro}>
          Want to know what I'm reading right now or looking for a new book to
          try? Here's exactly that, taken from my{' '}
          <a href="https://beta.readng.co">Readng</a>.
        </p>
        <Readng />
      </section>
    </Content> */}
  </Page>
);
}
// export const query = graphql`
//   {
//     allMdx(
//       sort: { fields: fields___date, order: DESC }
//       filter: {
//         fileAbsolutePath: { regex: "/blog/" }
//         frontmatter: { published: { eq: true } }
//       }
//       limit: 4
//     ) {
//       edges {
//         node {
//           fields {
//             slug
//             title
//             date(formatString: "MMMM DD, YYYY")
//           }
//           frontmatter {
//             thumbnail {
//               publicURL
//               extension
//               childImageSharp {
//                 gatsbyImageData(
//                   width: 114
//                   quality: 90
//                   formats: [AUTO, WEBP, AVIF]
//                   layout: CONSTRAINED
//                 )
//               }
//             }
//             description
//           }
//         }
//       }
//     }
//   }
// `;

export default IndexPage;
