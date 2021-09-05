import { useRouter } from 'next/router';
import Blogpost from '../components/Blogpost';
import Page from '../components/Page';
import Text from '../components/Text';
import SEO from '../components/Seo';
import { getAllContentOfType } from '../lib/blog';

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
  const posts = await getAllContentOfType('_posts', [
    'title',
    'date',
    'slug',
    'description',
    'publishedOn',
  ]);

  return { props: { posts } };
}
