import { MDXRemote } from 'next-mdx-remote';
import Page from '../components/Page';
import Stack from '../components/Stack';
import Sidebar from '../components/Sidebar/index.jsx';
import Text from '../components/Text';
import TableOfContents from '../components/TableOfContents';
import Form from '../components/Form';
import { getAllContentOfType } from '../lib/blog';
import { prepareMDX } from '../lib/mdx';

import { baseComponents } from '../lib/base-components';

const Snippets = ({ allMDX }) => {
  // // create a big ol' string of rawMDX for the table of contents
  const allRawMDX = allMDX.map(({ rawMDX }) => rawMDX).join('');

  return (
    <Page layout="grid" padding>
      <Stack maxWidth="sm" gap={1.45} style={{ gridArea: 'content' }} padding>
        <Text as="h1" size="2xl" heading>
          Snippets
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
          veritatis necessitatibus ea veniam, odit quidem amet eius iure aliquam
          expedita placeat dolores quasi, doloremque numquam? Error earum
          deleniti natus magnam.
        </Text>
        {allMDX.map(({ source }, index) => (
          <MDXRemote key={index} {...source} components={baseComponents} />
        ))}
        <Form
          title="Snippets"
          text="Do you know a great snippet which you think should be added to this page? Send it over and I'll take a look!"
        />
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
