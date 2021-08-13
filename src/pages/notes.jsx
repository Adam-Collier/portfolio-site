/* eslint-disable camelcase */
import { useRouter } from 'next/router';

import Page from '../components/Page';
import Text from '../components/Text';
import SEO from '../components/Seo';
import Resource from '../components/Resource';

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
      {content.map(({ title, description, slug }, index) => (
        <Resource
          key={index}
          title={title}
          description={description}
          url={`/notes/${slug}`}
        />
      ))}
    </Page>
  );
};

export default Notes;

export async function getStaticProps() {
  const response = await getNotionData(process.env.NOTION_NOTES_ID);

  // format into everything we need for the blogposts component
  const content = response.map(({ properties }) => {
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
