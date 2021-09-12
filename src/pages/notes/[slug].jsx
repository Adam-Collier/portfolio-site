/* eslint-disable no-unreachable */
import { getNotionData } from '../../lib/get-notion-data';
import Page from '../../components/Page';
import Text from '../../components/Text';
import Stack from '../../components/Stack';
import Sidebar from '../../components/Sidebar';
import TableOfContents from '../../components/TableOfContents';
import PublishedAndUpdated from '../../components/PublishedAndUpdated';
import SEO from '../../components/Seo';

import { getBlockMap } from '../../lib/get-block-map';
import { renderBlocks } from '../../lib/notion-api-worker-renderer';
import { toSlug } from '../../utils/to-slug';
import { getHeadings } from '../../lib/get-headings';

const Note = ({ blocks, page }) => {
  const headings = getHeadings(blocks);

  const {
    lastEditedTime,
    PublishedOn,
    Title,
    Description,
    Sidebar: sidebar,
  } = page;
  const publishedOn = PublishedOn;
  const title = Title;
  const description = Description;
  const slug = toSlug(Title);

  return (
    <Page
      padding
      layout={sidebar ? 'grid' : 'stack'}
      areas={{ sm: `"content" "coffee"` }}
    >
      <SEO
        title={`${title} Notes - Adam Collier`}
        description={description}
        pathname={`/notes/${slug}`}
      />
      <Stack gap={1.45} style={{ gridArea: 'content' }} maxWidth="sm">
        <PublishedAndUpdated
          updatedOn={lastEditedTime}
          publishedOn={publishedOn}
        />
        <Text as="h1" size="2xl" heading>
          {title}
        </Text>
        {blocks.map((block, index) => renderBlocks(block, index))}
      </Stack>
      <Sidebar top={8}>
        <TableOfContents headings={headings} />
      </Sidebar>
    </Page>
  );
};

export async function getStaticProps({ params }) {
  const { slug } = params;

  const { blocks, page } = await getBlockMap(process.env.NOTION_NOTES_ID, slug);

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
