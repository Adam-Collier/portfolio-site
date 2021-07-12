import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Text from '../components/Text';
import Stack from '../components/Stack';
import Blogpost from '../components/Blogpost';

import { getAllContentOfType } from '../lib/blog';
import { getTopTracks } from '../lib/spotify';
import { getReadngContent } from '../lib/readng';

import Page from '../components/Page';
import SEO from '../components/Seo';
import Spotify from '../components/Spotify';
import Readng from '../components/Readng';

const IndexPage = ({ posts, tracks, readng }) => {
  const router = useRouter();

  return (
    <Page gap={2.5} paddingTop={8} padding>
      <SEO
        title=""
        description="Creative UX Designer Developer from Manchester, UK. Creating content to come back to. Discover useful snippets, resources and blogposts."
        pathname={router.pathname}
      />
      <Stack gap={1.45}>
        <Text as="h1" heading size="2xl">
          Hey, I'm Adam Collier
        </Text>
        <Text size="lg">
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
        </Text>
      </Stack>
      <Stack gap={1.45}>
        <Text>
          Looking for the latest blog post? Here’s the latest four I’ve written!
          Check out the{' '}
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
        <Spotify tracks={tracks} />
      </Stack>
      <Stack gap={1.45}>
        <Text>
          Want to know what I'm reading right now or looking for a new book to
          try? Here's exactly that, taken from my{' '}
          <Link href="https://beta.readng.co">
            <a>Readng</a>
          </Link>
          .
        </Text>
        <Readng data={readng} />
      </Stack>
    </Page>
  );
};

export async function getStaticProps() {
  const posts = await getAllContentOfType(
    '_posts',
    ['title', 'publishedOn', 'slug', 'description'],
    { limit: 4 }
  );

  const readng = await getReadngContent();

  // get the spotify tracks
  const response = await getTopTracks();
  const { items: toptracks } = await response.json();
  // get the first 5 tracks and return an array of objects
  const tracks = toptracks.slice(0, 5).map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    url: track.external_urls.spotify,
    title: track.name,
    image: track.album.images[0].url,
  }));

  return { props: { posts, tracks, readng }, revalidate: 60 };
}

export default IndexPage;
