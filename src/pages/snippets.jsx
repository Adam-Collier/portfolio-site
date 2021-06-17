import { MDXRemote } from 'next-mdx-remote';
import Stack from '../components/Stack';
import { getAllContentOfType } from '../lib/blog';
import { prepareMDX } from '../lib/mdx';

import { baseComponents } from '../lib/base-components';

const Snippets = ({ allMDX }) => (
  <Stack maxWidth="sm" page gap={1.45}>
    {allMDX.map(({ source }, index) => (
      <MDXRemote key={index} {...source} components={baseComponents} />
    ))}
  </Stack>
);

export async function getStaticProps() {
  const allSnippets = await getAllContentOfType('_snippets', ['title', 'slug']);

  const allMDX = await Promise.all(
    allSnippets.map(async (snippet) => {
      // this returns the source prop
      const mdx = await prepareMDX(snippet.slug, '_snippets');
      return mdx;
    })
  );

  return {
    props: {
      allMDX,
    },
  };
}

export default Snippets;
