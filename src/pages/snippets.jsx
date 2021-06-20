import { MDXRemote } from 'next-mdx-remote';
import Page from '../components/Page';
import { getAllContentOfType } from '../lib/blog';
import { prepareMDX } from '../lib/mdx';

import { baseComponents } from '../lib/base-components';

const Snippets = ({ allMDX }) => (
  <Page padding>
    {allMDX.map(({ source }, index) => (
      <MDXRemote key={index} {...source} components={baseComponents} />
    ))}
  </Page>
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
