/* eslint-disable camelcase */
import { useRouter } from 'next/router';

import Page from '../components/Page';
import Text from '../components/Text';
import SEO from '../components/Seo';
import Note from '../components/Note';
import Stack from '../components/Stack';

import { getNotionData } from '../lib/get-notion-data';

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
        A space for quick thoughts, ideas and learning references. Powered by
        the new Notion API and ISR (Incremental Static Regeneration).
      </Text>
      <Stack>
        {content.map(({ title, publishedOn, updatedOn, slug }, index) => (
          <Note
            key={index}
            title={title}
            publishedOn={publishedOn}
            updatedOn={updatedOn}
            url={`/notes/${slug}`}
          />
        ))}
      </Stack>
    </Page>
  );
};

export default Notes;

export async function getStaticProps() {
  const response = await getNotionData(process.env.NOTION_NOTES_ID);

  // format into everything we need for the blogposts component
  const content = response.map(({ properties, last_edited_time }) => {
    const { PublishedOn, Title } = properties;

    const title = Title.title[0].plain_text;
    const slug = title.toLowerCase().replace(/ /g, '-');

    return {
      title,
      publishedOn: PublishedOn?.date?.start || null,
      updatedOn: last_edited_time,
      slug,
    };
  });

  return { props: { content }, revalidate: 60 };
}
