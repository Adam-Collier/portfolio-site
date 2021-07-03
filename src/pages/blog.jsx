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
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed assumenda
        dicta iusto, provident fuga, nobis, obcaecati voluptates repellendus at
        ea eius. Iste quos voluptatibus quo aliquam aperiam magnam ab ducimus.
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
