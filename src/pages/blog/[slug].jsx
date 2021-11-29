/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import PublishedAndUpdated from '../../components/PublishedAndUpdated';
import Stack from '../../components/Stack';
import Page from '../../components/Page';
import Text from '../../components/Text';
import CommentForm from '../../components/CommentForm';
import Sidebar from '../../components/Sidebar/index.jsx';
import TableOfContents from '../../components/TableOfContents';
import SEO from '../../components/Seo';
import { renderBlocks } from '../../lib/notion-api-worker-renderer';
import { getBlockMap } from '../../lib/get-block-map';
import { getHeadings } from '../../lib/get-headings';
import { toSlug } from '../../utils/to-slug';

const Post = ({ blocks, page }) => {
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
      areas={{ sm: `"content" "coffee"` }}
      layout={sidebar === false ? 'stack' : 'grid'}
      padding
    >
      <SEO
        title={`${title} - Adam Collier`}
        description={description}
        image={null}
        pathname={`/blog/${slug}`}
      />
      <Stack maxWidth="sm" gap={1.45} style={{ gridArea: 'content' }}>
        <Stack gap={0.5}>
          <PublishedAndUpdated
            updatedOn={lastEditedTime}
            publishedOn={publishedOn}
          />
          <Text as="h1" size="2xl" heading>
            {title}
          </Text>
        </Stack>
        {blocks.map((block, index) => renderBlocks(block, index))}
        <CommentForm
          title={title}
          text="Please let me know if you found anything I wrote confusing, incorrect or
        outdated. Write a few words below and I will use your suggestions to
        improve this post."
        />
      </Stack>
      <Sidebar top={8}>
        <TableOfContents headings={headings} />
      </Sidebar>
    </Page>
  );
};

export default Post;

export async function getStaticProps({ params }) {
  const { slug } = params;

  const { blocks, page } = await getBlockMap(process.env.NOTION_POSTS_ID, slug);

  return {
    props: {
      page,
      blocks,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const response = await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_POSTS_ID}`
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
