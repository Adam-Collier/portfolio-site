import { MDXRemote } from 'next-mdx-remote';
import { getAllContentOfType } from '../../lib/blog';
import { prepareMDX } from '../../lib/mdx';
import { baseComponents } from '../../lib/base-components';

const Resource = ({ source }) => (
  <MDXRemote {...source} components={baseComponents} />
);

export default Resource;

export async function getStaticProps({ params }) {
  const mdx = await prepareMDX(params.slug, '_resources');

  return {
    props: {
      ...mdx,
    },
  };
}

export async function getStaticPaths() {
  const allResources = await getAllContentOfType('_resources', ['slug']);

  return {
    paths: allResources.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}
