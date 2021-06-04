import Blogpost from '../components/Blogpost';
import { getAllContentOfType } from '../lib/blog';

const Blog = ({ posts }) => posts.map((post) => <Blogpost {...post} />);

export default Blog;

export async function getStaticProps() {
  const posts = await getAllContentOfType('_posts', [
    'title',
    'date',
    'slug',
    'description',
  ]);

  return { props: { posts } };
}
