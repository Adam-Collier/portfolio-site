import { getNotionData } from '../../lib/get-notion-data';
import Page from '../../components/Page';
import Text from '../../components/Text';
import Stack from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import TableOfContents from '../../components/TableOfContents';
import { renderBlocks } from '../../lib/notion-api-worker-renderer';

const Note = ({ blocks, page }) => {
  const headings = [];

  blocks.forEach((block) => {
    if (block.type === 'sub_header') {
      const title = block.properties.title[0][0];
      const id = title.toLowerCase().replace(/ /g, '-');
      headings.push({ id, title, items: [] });
    }

    if (block.type === 'sub_sub_header') {
      const title = block.properties.title[0][0];
      const id = title.toLowerCase().replace(/ /g, '-');
      headings[headings.length - 1].items.push({
        id,
        title,
      });
    }
  });

  return (
    <Page
      padding
      // layout={frontmatter.sidebar === false ? 'stack' : 'grid'}
      layout="grid"
      areas={{ sm: `"content" "share"` }}
    >
      <Stack maxWidth="sm" gap={1.45} style={{ gridArea: 'content' }}>
        <Text as="h1" size="2xl" heading>
          {page.properties.Title.title[0].plain_text}
        </Text>
        {blocks.map((block, index) => renderBlocks(block, index))}
      </Stack>
      <Sidebar top={8}>
        <TableOfContents headings={headings} />
        {/* <SharePost layout={frontmatter.sidebar === false ? 'fill' : 'fit'} /> */}
      </Sidebar>
    </Page>
  );
};

export async function getStaticProps({ params }) {
  const { slug } = params;

  // grab all of the notes so we can compare the slug
  const allNotes = await getNotionData(process.env.NOTION_NOTES_ID);

  // convert the title property to the slug and compare it to the slug param
  const page = allNotes.find(({ properties }) => {
    const title = properties.Title.title[0].plain_text;
    const noteSlug = title.toLowerCase().replace(/ /g, '-');

    return noteSlug === slug;
  });

  const response = await fetch(
    `https://notion-api.splitbee.io/v1/page/${page.id}`
  ).then((res) => res.json());

  // we dont need the page information here, we only want the blocks to loop over
  const blockArr = Object.values(response).slice(1);

  const getBlockMap = (blocksArr) =>
    // group ordered lists and unordered list in their own group type
    blocksArr.reduce((arr, { value: block }) => {
      const listTypes = ['bulleted_list', 'numbered_list'];
      // check if block type is bullet or numbered
      if (listTypes.includes(block.type)) {
        // create bullet/numbered_list_group type
        const groupType = `${block.type}_group`;
        // if a group doesnt exist, add one
        if (arr.length === 0 || arr[arr.length - 1].type !== groupType) {
          // create the group and add the group
          arr.push({
            type: groupType,
            properties: [{ ...block }],
          });
        } else {
          // otherwise add to the last group
          arr[arr.length - 1].properties.push(block);
        }
        return arr;
      }

      arr.push(block);

      return arr;
    }, []);

  const blocks = await getBlockMap(blockArr);

  return {
    props: {
      page,
      blocks,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const response = await getNotionData(process.env.NOTION_NOTES_ID);

  const paths = response.map(({ properties }) => {
    const { Title } = properties;

    const title = Title.title[0].plain_text;
    const slug = title.toLowerCase().replace(/ /g, '-');

    return {
      params: { slug },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}

export default Note;
