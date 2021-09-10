import { useRouter } from 'next/router';
import Blogpost from '../components/Blogpost';
import Page from '../components/Page';
import Text from '../components/Text';
import SEO from '../components/Seo';
import { toSlug } from '../utils/to-slug';

const Blog = ({ posts }) => {
  const router = useRouter();

  return (
    <Page padding maxWidth="sm" gap={1.45}>
      <SEO
        title="Blog - Adam Collier"
        description="'A collection of writing which can range from talking about code, design or life in general. Enjoy this eclectic collection of writings'"
        pathname={router.pathname}
      />
      <Text as="h1" size="2xl" heading>
        Blog
      </Text>
      <Text>
        Writing content leaning towards but not limited to development and
        design. A space to learn, rethink ideas and discover something new.
      </Text>
      {posts.map((post, index) => (
        <Blogpost {...post} key={index} />
      ))}
    </Page>
  );
};

export default Blog;

export async function getStaticProps() {
  const postsResponse = await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_POSTS_ID}`
  ).then((res) => res.json());

  const sortedPostsResponse = postsResponse
    .filter((post) => post.PublishedOn)
    .sort((a, b) => new Date(b.PublishedOn) - new Date(a.PublishedOn));

  const posts = sortedPostsResponse.map((post) => {
    const { Title, Thumbnail, Description, PublishedOn } = post;

    return {
      title: Title,
      thumbnail: Thumbnail[0]?.url,
      slug: toSlug(Title),
      description: Description,
      publishedOn: PublishedOn,
    };
  });

  return { props: { posts } };
}
