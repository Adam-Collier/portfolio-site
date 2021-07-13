import { useState } from 'react';
import { useRouter } from 'next/router';
import Resource from '../components/Resource';
import Text from '../components/Text';
import Page from '../components/Page';
import Stack from '../components/Stack';
import Search from '../components/Search';
import SEO from '../components/Seo';
import { getAllContentOfType } from '../lib/blog';

const Blog = ({ allResources }) => {
  const router = useRouter();
  const [resources, setResources] = useState(allResources);

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
      <Search allData={allResources} setState={setResources} name="resources" />
      <Stack gap={0.5}>
        {resources.map((resource, index) => (
          <Resource {...resource} key={index} />
        ))}
      </Stack>
    </Page>
  );
};

export default Blog;

export async function getStaticProps() {
  const allResources = await getAllContentOfType('_resources', [
    'title',
    'slug',
    'description',
    'content',
  ]);

  return { props: { allResources } };
}
