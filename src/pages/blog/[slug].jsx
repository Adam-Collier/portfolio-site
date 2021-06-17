import { MDXRemote } from 'next-mdx-remote';
import dynamic from 'next/dynamic';
import Stack from '../../components/Stack';
import { prepareMDX } from '../../lib/mdx';
import { baseComponents } from '../../lib/base-components';

import { getAllContentOfType } from '../../lib/blog';

const components = {
  Button: dynamic(() => import('../../components/Button')),
  FormNoStyles: dynamic(() =>
    import(
      '../../../_posts/add-a-form-to-your-Gatsby-site-using-Staticforms/components/FormNoStyles'
    )
  ),
  FormWithStyles: dynamic(() =>
    import(
      '../../../_posts/add-a-form-to-your-Gatsby-site-using-Staticforms/components/FormWithStyles'
    )
  ),
  Film: dynamic(() => import('../../components/Film')),
  FilmCover: dynamic(() => import('../../components/FilmCover')),
  Grid: dynamic(() => import('../../components/Grid')),
  ...baseComponents,
};

const Post = ({ source }) => (
  <Stack gap={1.45} maxWidth="sm" page>
    <MDXRemote {...source} components={components} />
  </Stack>
);

export default Post;

export async function getStaticProps({ params }) {
  const mdx = await prepareMDX(params.slug, '_posts');

  return {
    props: {
      ...mdx,
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
