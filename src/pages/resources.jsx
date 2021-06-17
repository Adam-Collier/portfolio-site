import { useState } from 'react';
import Resource from '../components/Resource';
import Text from '../components/Text';
import Stack from '../components/Stack';
import Search from '../components/Search';
import { getAllContentOfType } from '../lib/blog';

const Blog = ({ allResources }) => {
  const [resources, setResources] = useState(allResources);

  return (
    <Stack maxWidth="sm" gap={2} style={{ marginTop: '3.5rem' }} padding page>
      <Text size="lg">
        This is a group of resources I have either learned something from or
        thought could become useful in the future.
      </Text>
      <Search allData={allResources} setState={setResources} name="resources" />
      <Stack gap={0.5}>
        {resources.map((resource, index) => (
          <Resource {...resource} key={index} />
        ))}
      </Stack>
    </Stack>
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
