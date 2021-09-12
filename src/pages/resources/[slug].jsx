import Link from 'next/link';
import { Link as LinkIcon } from 'react-feather';
import Text from '../../components/Text';
import Page from '../../components/Page';
import Stack from '../../components/Stack';
import Form from '../../components/Form';
import Sidebar from '../../components/Sidebar/index.jsx';
import SEO from '../../components/Seo';
import PublishedAndUpdated from '../../components/PublishedAndUpdated';

import { getBlockMap } from '../../lib/get-block-map';
import { toSlug } from '../../utils/to-slug';

import s from './resource.module.css';
import { renderBlocks } from '../../lib/notion-api-worker-renderer';

const Resource = ({ blocks, page, quickLinks }) => {
  const {
    Description: description,
    Title: title,
    lastEditedTime,
    PublishedOn: publishedOn,
  } = page;

  const slug = toSlug(title);

  return (
    <Page layout="grid" areas={{ sm: `"content" "coffee"` }} padding>
      <SEO
        title={`${title} - Adam Collier`}
        description={description}
        pathname={`/resources/${slug}`}
      />
      <Stack maxWidth="sm" gap={1.45} style={{ gridArea: 'content' }}>
        <PublishedAndUpdated
          publishedOn={publishedOn}
          updatedOn={lastEditedTime}
        />
        <Text as="h1" size="2xl" heading>
          {title}
        </Text>
        {blocks.map((block, index) => renderBlocks(block, index))}
        <Form
          title={title}
          text="Do you know a resource that could benefit another reader and is relevent for this page? Let me know by leaving a short message below and I will take a look!"
        />
      </Stack>
      <Sidebar top={6.5} style={{ gridArea: 'quick-links' }}>
        <Stack gap={1.45} className={s.quickLinks}>
          <Text size="md" heading>
            <LinkIcon size={14} style={{ marginRight: '4px' }} /> Quick Links
          </Text>
          <ul className={s.resource}>
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link href={`/resources/${link.slug}`}>
                  <a className={slug === link.slug ? s.active : ''}>
                    <Text size="sm">{link.title}</Text>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </Stack>
      </Sidebar>
    </Page>
  );
};

export default Resource;

export async function getStaticProps({ params }) {
  const { slug } = params;

  const { blocks, page, table } = await getBlockMap(
    process.env.NOTION_RESOURCES_ID,
    slug
  );

  const quickLinks = table.map((row) => ({
    slug: toSlug(row.Title),
    title: row.Title,
  }));

  return {
    props: {
      blocks,
      page,
      quickLinks,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const response = await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_RESOURCES_ID}`
  ).then((res) => res.json());

  return {
    paths: response.flatMap((post) => {
      if (!post.PublishedOn) return [];

      const { Title } = post;
      return {
        params: {
          slug: toSlug(Title),
        },
      };
    }),
    fallback: false,
  };
}
