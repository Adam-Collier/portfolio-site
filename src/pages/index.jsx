import React from 'react';
import Link from 'next/link';
import Text from '../components/Text';
import Stack from '../components/Stack';
import Blogpost from '../components/Blogpost';

import { getTopTracks } from '../lib/spotify';
import { getReadngContent } from '../lib/readng';
import { getLatestFilms } from '../lib/letterboxd';

import Page from '../components/Page';
import SEO from '../components/Seo';
import Spotify from '../components/Spotify';
import Readng from '../components/Readng';
import Letterboxd from '../components/Letterboxd';

import { toSlug } from '../utils/to-slug';

const IndexPage = ({ posts, tracks, readng, letterboxd }) => (
  <Page gap={2.5} paddingTop={8} padding>
    <SEO
      title="Adam Collier"
      description="Creative UX Designer Developer from Manchester, UK. Creating content to come back to. Discover useful snippets, resources and blogposts."
      pathname="/"
    />
    <Stack gap={1.45}>
      <Text as="h1" heading size="2xl">
        Hey, I'm Adam Collier
      </Text>
      <Text size="lg">
        A designer and developer from Manchester, UK. Instead of the traditional
        portfolio site that never gets updated I wanted to make something
        functional, practical and useful in my day to day. It will exist as an
        ever growing repository of ideas, productivity helpers and things I
        enjoy. Something noteworthy I should add?{' '}
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
        Wondering what music I’m loving right now? Here’s my top tracks from my{' '}
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
    <Stack gap={1.45}>
      <Text>
        Struggling for what film to watch next? Below is my latest five and you
        can find more on my{' '}
        <Link href="https://letterboxd.com/mistapolnareff/">
          <a>Letterboxd</a>
        </Link>
        .
      </Text>
      <Letterboxd data={letterboxd} />
    </Stack>
  </Page>
);

export async function getStaticProps() {
  const postsResponse = await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_POSTS_ID}`
  ).then((res) => res.json());

  // only grab the first 4 posts
  // they should be pre sorted by date in Notion
  const posts = postsResponse.slice(0, 4).flatMap((post) => {
    // dont include any incomplete blog posts;
    if (post.Status !== 'Completed') return [];

    const { Title, Thumbnail, Description, PublishedOn } = post;

    return {
      title: Title,
      thumbnail: Thumbnail[0]?.url,
      slug: toSlug(Title),
      description: Description,
      publishedOn: PublishedOn,
    };
  });

  const readng = await getReadngContent();
  const letterboxd = await getLatestFilms();

  // get the spotify tracks
  const response = await getTopTracks();
  const { items: toptracks } = await response.json();
  // get the first 5 tracks and return an array of objects
  const tracks = toptracks.map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    url: track.external_urls.spotify,
    title: track.name,
    image: track.album.images[0].url,
  }));

  return { props: { posts, tracks, readng, letterboxd }, revalidate: 60 };
}

export default IndexPage;
