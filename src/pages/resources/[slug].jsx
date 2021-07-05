import { MDXRemote } from 'next-mdx-remote';
import css from 'styled-jsx/css';
import Text from '../../components/Text';
import Page from '../../components/Page';
import Stack from '../../components/Stack';
import Form from '../../components/Form';
import { getAllContentOfType } from '../../lib/blog';
import { prepareMDX } from '../../lib/mdx';
import { baseComponents } from '../../lib/base-components';
import { toTitleCase } from '../../utils/to-title-case';

const resource = css.global`
  .resource {
    display: flex;
    flex-wrap: wrap;
  }
  .resource div {
    flex: 0 0 200px;
  }
  @media (max-width: 767px) {
    .resource div {
      flex: 1 0 200px;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    .resource div {
      flex: 0 0 150px;
    }
  }
  .resource > p {
    flex: 1 1 200px;
  }
  @media (min-width: 768px) {
    .resource > p {
      padding-left: 1.25rem;
    }
  }
  .resource div p {
    margin-bottom: 0.125rem;
    color: var(--foreground-high);
  }
  .resource div p:last-of-type {
    font-size: 0.875rem;
  }
  @media (min-width: 768px) {
    .resource div p:last-of-type {
      margin-bottom: 1.45rem;
    }
  }
`;

const Resource = ({ source, title }) => {
  const { scope } = source;
  return (
    <Page layout="grid" padding>
      <Stack maxWidth="sm" gap={1.45} style={{ gridArea: 'content' }} padding>
        <style jsx global>
          {resource}
        </style>
        <Text as="h1" size="2xl" heading>
          {scope.title}
        </Text>
        <MDXRemote {...source} components={baseComponents} />
        <Form
          title={title}
          text="Do you know a resource that could benefit another reader and is relevent for this page? Let me know by leaving a short message below and I will take a look!"
        />
      </Stack>
    </Page>
  );
};

export default Resource;

export async function getStaticProps({ params }) {
  const { slug } = params;
  const mdx = await prepareMDX(slug, '_resources');

  const title = toTitleCase(slug);

  return {
    props: {
      ...mdx,
      title,
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
