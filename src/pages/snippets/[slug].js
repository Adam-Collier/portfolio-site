import Text from '../../components/Text';
import Page from '../../components/Page';
import Stack from '../../components/Stack';
import SEO from '../../components/Seo';
import PublishedAndUpdated from '../../components/PublishedAndUpdated';

import { toSlug } from '../../utils/to-slug';
import { toTitleCase } from '../../utils/to-title-case';

import prisma from '../../lib/prisma';
import Button from '../../components/Button';
import Snippet from '../../components/Snippet';
import SnippetForm from '../../components/Form/SnippetForm';
import Dialog from '../../components/Dialog';
import useSWR from 'swr';
import { fetcher } from '../../lib/fetcher';
import useSession from '../../lib/useSession';
import EditToolbar from '../../components/EditToolbar';
import SnippetMenu from "../../components/Snippet/Menu";
import Sidebar from '../../components/Sidebar';

const Resource = ({ page, collections }) => {
  const { admin } = useSession();

  let pageId = page.id;

  const { data, error } = useSWR('/api/snippets' + pageId, fetcher, {
    fallbackData: page,
    revalidateOnMount: false,
    revalidateOnFocus: false,
  });

  let { name, snippets, createdAt, updatedAt, description } = data;

  if(snippets.length) {
    updatedAt = snippets[0].updatedAt;
  }

  return (
    <Page layout="grid" padding>
      <SEO
        title={`${name} - Adam Collier`}
        description={`All of the ${name} snippets I find useful and help me in my day to day`}
        pathname={`/snippets/${toSlug(name)}`}
      />
      <Stack maxWidth="sm" gap={1.45} style={{ gridArea: 'content' }}>
        {admin?.isLoggedIn && (
          <Dialog
            headerText="Add a Snippet"
            trigger={<Button variant="secondary">Add a Snippet</Button>}
          >
            <SnippetForm pageId={pageId} />
          </Dialog>
        )}

        <PublishedAndUpdated publishedOn={createdAt} updatedOn={updatedAt} />
        <Text as="h1" size="2xl" heading>
          {name}
        </Text>
        <Text>
          {description}
        </Text>

        {snippets &&
          snippets.map(
            (
              { id: itemId, title, collectionId, content },
              index
            ) => (
              <Snippet
                key={index}
                itemId={itemId}
                title={title}
                collectionName={name}
                content={content}
              >
                {admin?.isLoggedIn && (
                  <EditToolbar
                    // 1. we need the itemId so prisma knows which item to update
                    // 2. we need pageId so the swr id matches the cached one about
                    form={
                      <SnippetForm
                      pageId={pageId}
                        itemId={itemId}
                        title={title}
                        content={content}
                        collectionId={collectionId}
                        edit
                      />
                    }
                    apiRoute="/api/snippets"
                    // these are needed for deleting the item and updating the page
                    itemId={itemId}
                    pageId={pageId}
                  />
                )}
              </Snippet>
            )
          )}
      </Stack>
      <Sidebar>
        <SnippetMenu collections={collections} />
      </Sidebar>
    </Page>
  );
};

export default Resource;

export async function getStaticProps({ params }) {
  const { slug } = params;

  // the slug needs to match the name here
  const response = await prisma.snippetCollection.findUnique({
    where: { name: toTitleCase(slug) },
    include: {
      snippets: true,
    },
  });

  const page = JSON.parse(JSON.stringify(response));

  // get all of the collections for the snippet menu
  const collectionsResponse = await prisma.snippetCollection.findMany({
    include: {
      snippets: true,
    },
  });

  const collections = JSON.parse(JSON.stringify(collectionsResponse));

  return {
    props: {
      page,
      collections,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const response = await prisma.snippetCollection.findMany({
    select: { name: true },
  });

  return {
    paths: response.map(({ name }) => {
      return {
        params: {
          slug: toSlug(name),
        },
      };
    }),
    fallback: 'blocking',
  };
}
