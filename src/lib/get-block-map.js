import { toSlug } from '../utils/to-slug';

export const getBlockMap = async (id, slug) => {
  const notionTable = await fetch(
    `https://notion-api.splitbee.io/v1/table/${id}`
  ).then((res) => res.json());

  if (!notionTable) console.log(`${slug} needs to be shared to the web`);

  // convert the title property to the slug and compare it to the slug param
  const currentPage = notionTable.find((row) => {
    const rowSlug = toSlug(row.Title);
    return rowSlug === slug;
  });

  const blocksResponse = await fetch(
    `https://notion-api.splitbee.io/v1/page/${currentPage.id}`
  ).then((res) => res.json());

  // response needs to be turned into an array
  const [{ value }, ...pageBlocks] = Object.values(blocksResponse);

  const { last_edited_time: lastEditedTime } = value;
  // convert from milliseconds to ISO and assign to the currentPage object
  currentPage.lastEditedTime = new Date(lastEditedTime).toISOString();

  // group ordered lists and unordered list in their own group type
  const blocks = pageBlocks.reduce((arr, { value: block }) => {
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

  return { blocks, page: currentPage, table: notionTable };
};
