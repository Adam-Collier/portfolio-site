import { MDXRemote } from 'next-mdx-remote';
import css from 'styled-jsx/css';
import Link from 'next/link';
import { Link as LinkIcon } from 'react-feather';
import Text from '../../components/Text';
import Page from '../../components/Page';
import Stack from '../../components/Stack';
import Form from '../../components/Form';
import Sidebar from '../../components/Sidebar/index.jsx';
import { getAllContentOfType } from '../../lib/blog';
import { prepareMDX } from '../../lib/mdx';
import { baseComponents } from '../../lib/base-components';
import { toTitleCase } from '../../utils/to-title-case';

import s from './resource.module.css';

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

const Resource = ({ source, title, quickLinks }) => (
  <Page layout="grid" padding>
    <Stack maxWidth="sm" gap={1.45} style={{ gridArea: 'content' }}>
      <style jsx global>
        {resource}
      </style>
      <Text as="h1" size="2xl" heading>
        {title}
      </Text>
      <MDXRemote {...source} components={baseComponents} />
      <Form
        title={title}
        text="Do you know a resource that could benefit another reader and is relevent for this page? Let me know by leaving a short message below and I will take a look!"
      />
    </Stack>
    <Sidebar top={23}>
      <Stack gap={1.45} className={s.quickLinks}>
        <Text size="md" heading>
          <LinkIcon size={14} style={{ marginRight: '4px' }} /> Quick Links
        </Text>
        <ul className={s.resource}>
          {quickLinks.map((link, index) => (
            <li key={index}>
              <Link href={`/resources/${link.slug}`}>
                <a>
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

export default Resource;

export async function getStaticProps({ params }) {
  const { slug } = params;
  const mdx = await prepareMDX(slug, '_resources');
  const allResourceSlugs = await getAllContentOfType('_resources', ['slug']);

  const quickLinks = allResourceSlugs.reduce((acc, curr) => {
    if (curr.slug === slug) return acc;

    acc.push({
      slug: curr.slug,
      title: toTitleCase(curr.slug),
    });

    return acc;
  }, []);

  console.log(quickLinks);

  const title = toTitleCase(slug);

  return {
    props: {
      ...mdx,
      title,
      quickLinks,
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
