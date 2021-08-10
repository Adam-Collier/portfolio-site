/* eslint-disable camelcase */
import { useRouter } from 'next/router';
import { Client } from '@notionhq/client';
import Page from '../components/Page';
import Text from '../components/Text';
import SEO from '../components/Seo';
import Resource from '../components/Resource';

const Notes = ({ content }) => {
  const router = useRouter();

  return (
    <Page padding maxWidth="sm" gap={1.45}>
      <SEO
        title="Notes - Adam Collier"
        description="This is some note stuff"
        pathname={router.pathname}
      />
      <Text as="h1" size="2xl" heading>
        Notes
      </Text>
      <Text>
        This is my attempt at writing blog things. Writing isn't one of my
        strengths so bear with my poor sentence structures and inevitable typos.
        However, I'll always try my best! (queue anime hero montage) I'll mostly
        write content relating to the projects/side projects I'm working on and
        no doubt there will be some random ones in there too.
      </Text>
      {content.map(({ title, description, slug }, index) => (
        <Resource
          key={index}
          title={title}
          description={description}
          slug={slug}
        />
      ))}
    </Page>
  );
};

export default Notes;

export async function getStaticProps() {
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
    database_id: process.env.NOTION_NOTES_ID,
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

  // format into everything we need for the blogposts component
  const content = response.results.map(({ properties }) => {
    const { PublishedOn, Title, Description } = properties;

    const title = Title.title[0].plain_text;
    const slug = title.toLowerCase().replace(/ /g, '-');

    return {
      title,
      publishedOn: PublishedOn?.date?.start || null,
      description: Description.rich_text[0]?.plain_text,
      slug,
    };
  });

  return { props: { content }, revalidate: 60 };
}
