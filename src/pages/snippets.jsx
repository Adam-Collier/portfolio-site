import { MDXRemote } from 'next-mdx-remote';
import Page from '../components/Page';
import Stack from '../components/Stack';
import Sidebar from '../components/Sidebar/index.jsx';
import TableOfContents from '../components/TableOfContents';
import { getAllContentOfType } from '../lib/blog';
import { prepareMDX } from '../lib/mdx';

import { baseComponents } from '../lib/base-components';

const Snippets = ({ allMDX }) => {
  // // create a big ol' string of rawMDX for the table of contents
  const allRawMDX = allMDX.map(({ rawMDX }) => rawMDX).join('');

  return (
    <Page layout="grid" padding>
      <Stack maxWidth="sm" gap={1.45} style={{ gridArea: 'content' }} padding>
        {allMDX.map(({ source }, index) => (
          <MDXRemote key={index} {...source} components={baseComponents} />
        ))}
      </Stack>
      <Sidebar>
        <TableOfContents source={allRawMDX} />
      </Sidebar>
    </Page>
  );
};

export async function getStaticProps() {
  const allSnippets = await getAllContentOfType('_snippets', ['slug']);

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
