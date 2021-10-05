import { getBlockMap } from './get-block-map';
import { toSlug } from '../utils/to-slug';

export const getLatestSnippets = async () => {
  const response = await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_SNIPPETS_ID}`
  ).then((res) => res.json());

  const allSnippets = await Promise.all(
    // get the blockmap for each snippet category
    response.map(async (row) => {
      const { blocks } = await getBlockMap(
        process.env.NOTION_SNIPPETS_ID,
        toSlug(row.Title)
      );

      return blocks;
    })
  );

  const sortedSnippets = allSnippets
    .flat()
    .filter((snippet) => snippet.value.type === 'sub_sub_header')
    .sort(
      (a, b) =>
        new Date(b.value.last_edited_time) - new Date(a.value.last_edited_time)
    )
    .slice(0, 4);

  return sortedSnippets;
};
