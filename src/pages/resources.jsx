import { useRouter } from 'next/router';
import Text from '../components/Text';
import ResourceCollection from '../components/ResourceCollection';
import Page from '../components/Page';
import Stack from '../components/Stack';
import SEO from '../components/Seo';

import { toSlug } from '../utils/to-slug';
import prisma from '../lib/prisma';

const Resources = ({ allResourceCollections }) => {
  const router = useRouter();
  // const [resources, setResources] = useState(allResources);

  return (
    <Page paddingTop={8} gap={2} padding>
      <SEO
        title="Resources - Adam Collier"
        description="This is a group of resources I have either learned something from or thought could become useful in the future."
        pathname={router.pathname}
      />
      <Stack gap={1.45}>
        <Text as="h1" size="2xl" heading>
          Resources
        </Text>
        <Text size="lg">
          This is a group of resources I have either learned something from or
          thought could become useful in the future.
        </Text>
      </Stack>
      {/* <Search allData={allResources} setState={setResources} name="resources" /> */}
      <Stack gap={0.5}>
        {allResourceCollections.map(({ id, name, description, excerpt }) => (
          <ResourceCollection
            title={name}
            description={excerpt || description}
            url={`/resources/${toSlug(name)}`}
            key={id}
          />
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

  return { props: { allResourceCollections }, revalidate: 60 };
}
