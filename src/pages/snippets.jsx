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
      <Stack maxWidth="sm" gap={1.45} style={{ gridArea: 'content' }}>
        <Text as="h1" size="2xl" heading>
          Snippets
        </Text>
        <Text>
          Developers all share the experience of almost remembering some code
          they saw on Stackoverflow or blog post once. Sometimes even convincing
          themselves that it was used in another once of their projects (it
          wasn't). Scouring their search history for hours to no avail, only to
          be left in utter despair. Their once hot drink now sitting cold,
          undrinkable and staring at you... shaming you. That's happened to me
          far too many times and in a moment of strength I thought (extremely)
          loudly "THIS SHALL HAPPEN NO MORE!". So, I decided that I'll collate
          all of the ones I come back to again and again.
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
