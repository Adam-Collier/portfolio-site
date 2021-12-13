import { useRouter } from 'next/router';
import Text from '../components/Text';
import ResourceCollection from '../components/ResourceCollection';
import Page from '../components/Page';
import Stack from '../components/Stack';
import SEO from '../components/Seo';
import Dialog from '../components/Dialog';
import Button from '../components/Button';
import ResourceCollectionForm from '../components/Form/ResourceCollectionForm';
import useSession from '../lib/useSession';
import useSWR from 'swr';
import { fetcher } from '../lib/fetcher';
import EditToolbar from '../components/EditToolbar';

import { toSlug } from '../utils/to-slug';
import prisma from '../lib/prisma';

const Resources = ({ allResourceCollections }) => {
  const router = useRouter();
  const { admin } = useSession();

  // a random ID generated from https://nanoid.dev/
  let pageId = '547rhC799';
  let apiRoute = '/api/resource-collection';

  const { data } = useSWR(apiRoute + pageId, fetcher, {
    fallbackData: allResourceCollections,
    revalidateOnMount: false,
    revalidateOnFocus: false,
  });

  return (
    <Page paddingTop={8} gap={2} padding>
      <SEO
        title="Resources - Adam Collier"
        description="This is a group of resources I have either learned something from or thought could become useful in the future."
        pathname={router.pathname}
      />
      {admin?.isLoggedIn && (
        <Dialog
          headerText="Add a Collection"
          trigger={<Button variant="secondary">Add a Collection</Button>}
        >
          <ResourceCollectionForm apiRoute={apiRoute} pageId={pageId} />
        </Dialog>
      )}
      <Stack gap={1.45}>
        <Text as="h1" size="2xl" heading>
          Resources
        </Text>
        <Text size="lg">
          This is a group of resources I have either learned something from or
          thought could become useful in the future.
        </Text>
      </Stack>
      <Stack gap={0.5}>
        {data.map(({ id: itemId, name, description, excerpt }) => (
          <ResourceCollection
            key={itemId}
            title={name}
            description={excerpt || description}
            url={`/resources/${toSlug(name)}`}
          >
            {admin?.isLoggedIn && (
              <EditToolbar
                // 1. we need the itemId so prisma knows which item to update
                // 2. we need pageId so the swr id matches the cached one about
                form={
                  <ResourceCollectionForm
                    itemId={itemId}
                    apiRoute={apiRoute}
                    pageId={pageId}
                    name={name}
                    description={description}
                    excerpt={excerpt}
                    edit
                  />
                }
                apiRoute={apiRoute}
                // these are needed for deleting the item and updating the page
                itemId={itemId}
                pageId={pageId}
              />
            )}
          </ResourceCollection>
        ))}
      </Stack>
    </Page>
  );
};

export default Resources;

export async function getStaticProps() {
  const allResourceCollections = await prisma.resourceCollection.findMany({
    select: { id: true, name: true, excerpt: true, description: true },
  });

  return { props: { allResourceCollections }, revalidate: 1 };
}
