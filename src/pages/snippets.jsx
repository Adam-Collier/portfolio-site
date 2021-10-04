import { useRouter } from 'next/router';
import Page from '../components/Page';
import Stack from '../components/Stack';
import Sidebar from '../components/Sidebar/index.jsx';
import Text from '../components/Text';
import TableOfContents from '../components/TableOfContents';
import Form from '../components/Form';
import SEO from '../components/Seo';
import { renderBlocks } from '../lib/notion-api-worker-renderer';
import { getBlockMap } from '../lib/get-block-map';
import { getHeadings } from '../lib/get-headings';
import { toSlug } from '../utils/to-slug';

const Snippets = ({ allBlocks }) => {
  const router = useRouter();

  const flattenedBlocks = allBlocks.map(({ blocks }) => blocks).flat();
  const headings = getHeadings(flattenedBlocks);

  return (
    <Page layout="grid" padding areas={{ sm: `"content" "coffee"` }}>
      <SEO
        title="Snippets - Adam Collier"
        description="There's nothing worse than almost remembering a bit of code you saw on stackoverflow on in a blogpost once. So I've collated all of the ones I find most useful."
        pathname={router.pathname}
      />
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
        {allBlocks.map(({ blocks }) =>
          blocks.map((block, index) => renderBlocks(block, index))
        )}
        <Form
          title="Snippets"
          text="Do you know a great snippet which you think should be added to this page? Send it over and I'll take a look!"
        />
      </Stack>
      <Sidebar>
        <TableOfContents headings={headings} />
      </Sidebar>
    </Page>
  );
};

export async function getStaticProps() {
  const response = await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_SNIPPETS_ID}`
  ).then((res) => res.json());

  const allBlocks = await Promise.all(
    // get the blockmap for each snippet category
    response.map(async (row) => {
      const { blocks } = await getBlockMap(
        process.env.NOTION_SNIPPETS_ID,
        toSlug(row.Title)
      );

      // create a sub header for each snippet category
      const blocksWithHeading = [
        {
          value: {
            type: 'sub_header',
            properties: {
              title: [[row.Title]],
            },
          },
        },
        ...blocks,
      ];

      return {
        blocks: blocksWithHeading,
        title: toSlug(row.Title),
      };
    })
  );

  return {
    props: {
      allBlocks,
    },
    revalidate: 10,
  };
}

export default Snippets;
