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
        This is my attempt at writing blog things. Writing isn't one of my
        strengths so bear with my poor sentence structures and inevitable typos.
        However, I'll always try my best! (queue anime hero montage) I'll mostly
        write content relating to the projects/side projects I'm working on and
        no doubt there will be some random ones in there too.
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
