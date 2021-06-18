import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Text from '../components/Text';
import Stack from '../components/Stack';
import Blogpost from '../components/Blogpost';
import { getAllContentOfType } from '../lib/blog';

import Page from '../components/Page';
import SEO from '../components/Seo';
import Spotify from '../components/Spotify';

// import Content from '../components/Content';
// import Readng from '../components/Readng';

// import styles from './index.module.css';
// import Blogposts from '../components/Blogposts';

const IndexPage = ({ posts }) => {
  const router = useRouter();

  return (
    <Page containerType="fluid" location={router.pathname} noSidebar>
      <SEO
        title=""
        description="Creative UX Designer Developer from Manchester, UK. Creating content to come back to. Discover useful snippets, resources and blogposts."
        pathname={router.pathname}
      />
      <Stack maxWidth="sm" gap={2.5} page>
        <Stack gap={1.45} style={{ paddingTop: '3.5rem' }}>
          <Text as="h1" heading size="2xl">
            Hey, I'm Adam Collier
          </Text>
          <Text size="lg">
            A designer and developer from Manchester, UK. Instead of the
            traditional portfolio site that never gets updated I wanted to make
            something functional, practical and useful in my day to day. It will
            exist as an ever growing repository of ideas, productivity helpers
            and things I enjoy. Something noteworthy I should add?{' '}
            <a
              href="https://twitter.com/CollierAdam"
              target="_blank"
              rel="noopener noreferrer"
            >
              DM me on Twitter.
            </a>
          </Text>
        </Stack>
        <Stack gap={1.45}>
          <Text>
            Looking for the latest blog post? Here’s the latest four I’ve
            written! Check out the{' '}
            <Link href="/blog">
              <a>Blog</a>
            </Link>{' '}
            for more
          </Text>
          {posts.map((post, index) => (
            <Blogpost {...post} key={index} />
          ))}
        </Stack>
        <Stack gap={1.45}>
          <Text>
            Wondering what music I’m loving right now? Here’s my top tracks from
            my{' '}
            <Link href="https://open.spotify.com/user/1134435866">
              <a>Spotify</a>
            </Link>
            , updated regularly.
          </Text>
          <Spotify />
        </Stack>
        <Stack>
          <Text>
            Want to know what I'm reading right now or looking for a new book to
            try? Here's exactly that, taken from my{' '}
            <Link href="https://beta.readng.co">
              <a>Readng</a>
            </Link>
            .
          </Text>
        </Stack>
      </Stack>
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
};

export async function getStaticProps() {
  const posts = await getAllContentOfType(
    '_posts',
    ['title', 'date', 'slug', 'description'],
    { limit: 4 }
  );

  return { props: { posts } };
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
