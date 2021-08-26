import { useState } from 'react';
import { useRouter } from 'next/router';
import Resource from '../components/Resource';
import Text from '../components/Text';
import Page from '../components/Page';
import Stack from '../components/Stack';
import Search from '../components/Search';
import SEO from '../components/Seo';

import { toSlug } from '../utils/to-slug';

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
        {resources.map(({ title, description, slug }, index) => (
          <Resource
            title={title}
            description={description}
            url={`/resources/${slug}`}
            key={index}
          />
        ))}
      </Stack>
    </Page>
  );
};

export default Blog;

export async function getStaticProps() {
  const response = await fetch(
    `https://notion-api.splitbee.io/v1/table/${process.env.NOTION_RESOURCES_ID}`
  ).then((res) => res.json());

  const allResources = response.map((post) => {
    const { Title, Description } = post;

    return {
      title: Title,
      slug: toSlug(Title),
      description: Description,
    };
  });

  return { props: { allResources } };
}
