import { MDXRemote } from 'next-mdx-remote';
import Text from '../../components/Text';
import Page from '../../components/Page';
import Stack from '../../components/Stack';
import { getAllContentOfType } from '../../lib/blog';
import { prepareMDX } from '../../lib/mdx';
import { baseComponents } from '../../lib/base-components';

const Resource = ({ source }) => {
  const { scope } = source;
  return (
    <Page layout="grid" padding>
      <Stack maxWidth="sm" gap={1.45} style={{ gridArea: 'content' }} padding>
        <Text as="h1" size="2xl" heading>
          {scope.title}
        </Text>
        <MDXRemote {...source} components={baseComponents} />
      </Stack>
    </Page>
  );
};

export default Resource;

export async function getStaticProps({ params }) {
  const mdx = await prepareMDX(params.slug, '_resources');

  return {
    props: {
      ...mdx,
    },
  };
}

export async function getStaticPaths() {
  const allResources = await getAllContentOfType('_resources', ['slug']);

  return {
    paths: allResources.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}
