import { getAllContentOfType, getContentBySlug } from '../../lib/blog';

const Post = ({ post }) => {
  console.log(post, 'this is the post prop');
  return <>{post.content}</>;
};

export default Post;

export async function getStaticProps({ custom, params }) {
  console.log(custom, 'these are the params');
  const post = getContentBySlug('_posts', params.slug, [
    'title',
    'publishedOn',
    'updatedOn',
    'slug',
    'description',
    'content',
  ]);

  return {
    props: {
      post: {
        ...post,
      },
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllContentOfType('_posts', ['slug']);

  return {
    paths: allPosts.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}
