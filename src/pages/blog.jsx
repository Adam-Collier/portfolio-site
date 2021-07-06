import Blogpost from '../components/Blogpost';
import Page from '../components/Page';
import Stack from '../components/Stack';
import Text from '../components/Text';
import { getAllContentOfType } from '../lib/blog';

const Blog = ({ posts }) => (
  <Page padding>
    <Stack maxWidth="sm" gap={1.45} padding page>
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
    </Stack>
  </Page>
);

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
