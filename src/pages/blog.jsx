import Blogpost from '../components/Blogpost';
import Page from '../components/Page';
import Stack from '../components/Stack';
import { getAllContentOfType } from '../lib/blog';

const Blog = ({ posts }) => (
  <Page padding>
    <Stack maxWidth="sm" gap={1.45} padding page>
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
