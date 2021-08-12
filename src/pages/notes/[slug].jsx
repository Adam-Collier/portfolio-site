import { Client } from '@notionhq/client';
import { getNotionData } from '../../lib/get-notion-data';
import Page from '../../components/Page';
import { renderComponents } from '../../lib/render-notion-blocks';

const Note = ({ blocks }) => (
  <Page>{blocks.map((block, index) => renderComponents(block, index))}</Page>
);

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

  // set up another client
  // could this be joined with the other one?
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  // grab all of the blocks in the page
  const { results: blocks } = await notion.blocks.children.list({
    block_id: page.id,
  });

  // group ordered lists and unordered list in their own group type
  const blockMap = blocks.reduce((arr, block) => {
    const listTypes = ['bulleted_list_item', 'numbered_list_item'];
    // check if block type is bullet or numbered
    if (listTypes.includes(block.type)) {
      // create bullet/numbered_list_group type
      const groupType = `${block.type.slice(0, -4)}group`;
      // if a group doesnt exist, add one
      if (arr.length === 0 || arr[arr.length - 1].type !== groupType) {
        // create the group and add the group
        arr.push({
          type: groupType,
          items: [{ ...block }],
        });
      } else {
        // otherwise add to the last group
        arr[arr.length - 1].items.push(block);
      }
      return arr;
    }

    arr.push(block);

    return arr;
  }, []);

  return {
    props: {
      page,
      blocks: blockMap,
    },
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
    fallback: true,
  };
}

export default Note;
