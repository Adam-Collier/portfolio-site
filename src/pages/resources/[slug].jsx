import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';
import { Link as LinkIcon } from 'react-feather';
import Text from '../../components/Text';
import Page from '../../components/Page';
import Stack from '../../components/Stack';
import Form from '../../components/Form';
import Sidebar from '../../components/Sidebar/index.jsx';
import SharePost from '../../components/SharePost';
import SEO from '../../components/Seo';
import { getAllContentOfType } from '../../lib/blog';
import { prepareMDX } from '../../lib/mdx';
import { baseComponents } from '../../lib/base-components';
import { toTitleCase } from '../../utils/to-title-case';

import s from './resource.module.css';
import { resource } from '../../styles/global';

const Resource = ({ slug, source, title, frontmatter, quickLinks }) => {
  const { description } = frontmatter;

  return (
    <Page layout="grid" padding>
      <SEO
        title={`${title} - Adam Collier`}
        description={description}
        pathname={`/resources/${slug}`}
      />
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
      <Sidebar top={6.5} style={{ gridArea: 'quick-links' }}>
        <Stack gap={1.45} className={s.quickLinks}>
          <Text size="md" heading>
            <LinkIcon size={14} style={{ marginRight: '4px' }} /> Quick Links
          </Text>
          <ul className={s.resource}>
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link href={`/resources/${link.slug}`}>
                  <a className={slug === link.slug ? s.active : ''}>
                    <Text size="sm">{link.title}</Text>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </Stack>
        <SharePost text="Share this resource!" />
      </Sidebar>
    </Page>
  );
};

export default Resource;

export async function getStaticProps({ params }) {
  const { slug } = params;
  const mdx = await prepareMDX(slug, '_resources');
  const allResourceSlugs = await getAllContentOfType('_resources', ['slug']);

  const quickLinks = allResourceSlugs.map((resourceSlug) => ({
    slug: resourceSlug.slug,
    title: toTitleCase(resourceSlug.slug),
  }));

  const title = toTitleCase(slug);

  return {
    props: {
      slug,
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
