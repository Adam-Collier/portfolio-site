import { useMemo } from 'react';
import { getMDXComponent } from 'mdx-bundler/client';
import { getAllContentOfType, getContentBySlug } from '../../lib/blog';
import { prepareMDX, getComponents } from '../../lib/mdx';

const Post = ({ post, source }) => {
  const Component = useMemo(() => getMDXComponent(source), [source]);
  return <Component />;
};

export default Post;

export async function getStaticProps({ params }) {
  const post = getContentBySlug('_posts', params.slug, [
    'title',
    'publishedOn',
    'updatedOn',
    'slug',
    'description',
    'content',
    'name',
  ]);

  const components = await getComponents(`_posts/${post.name}/components`);

  const source = await prepareMDX(post.content, components);

  return {
    props: {
      post: {
        ...post,
      },
      source,
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
