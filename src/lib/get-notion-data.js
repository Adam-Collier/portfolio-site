import { Client } from '@notionhq/client';

export const getNotionData = async (id) => {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });

  // probably overcomplicated this but it works for now
  // checking if the Title is not empty prevents any issues from accidentally created blank rows
  const productionFilter =
    process.env.NODE_ENV === 'production'
      ? {
          and: [
            {
              property: 'PublishedOn',
              date: {
                is_not_empty: true,
              },
            },
            {
              property: 'Title',
              text: {
                is_not_empty: true,
              },
            },
          ],
        }
      : {
          property: 'Title',
          text: {
            is_not_empty: true,
          },
        };

  const response = await notion.databases.query({
    database_id: id,
    filter: {
      ...productionFilter,
    },
    sorts: [
      {
        property: 'Title',
        direction: 'ascending',
      },
    ],
  });

  return response.results;
};
