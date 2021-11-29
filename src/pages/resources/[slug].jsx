import { useState } from 'react';
import Link from 'next/link';
import { Link as LinkIcon } from 'react-feather';
import Text from '../../components/Text';
import Page from '../../components/Page';
import Stack from '../../components/Stack';
import ResourceItem from '../../components/Resource';
import CommentForm from '../../components/CommentForm';
import Sidebar from '../../components/Sidebar/index.jsx';
import SEO from '../../components/Seo';
import PublishedAndUpdated from '../../components/PublishedAndUpdated';

import { getBlockMap } from '../../lib/get-block-map';
import { toSlug } from '../../utils/to-slug';
import { toTitleCase } from '../../utils/to-title-case';

import s from './resource.module.css';
import { renderBlocks } from '../../lib/notion-api-worker-renderer';
import prisma from '../../lib/prisma';
import Button from '../../components/Button';
import { useSession } from 'next-auth/client';
import ResourceForm from '../../components/Form/ResourceForm';
import Dialog from '../../components/Dialog';

const Resource = ({ blocks, page, quickLinks }) => {
  const { name, description, resources, createdAt, updatedAt, id } = page;

  const [session] = useSession();

  return (
    <Page layout="grid" areas={{ sm: `"content" "coffee"` }} padding>
      <SEO
        title={`${name} - Adam Collier`}
        description={description}
        pathname={`/resources/${toSlug(name)}`}
      />
      <Stack maxWidth="sm" gap={1.45} style={{ gridArea: 'content' }}>
        {session && (
          <Dialog
            headerText="Create Resource"
            trigger={<Button text="Add a Resource" variation="secondary"/>}
          >
            <ResourceForm collectionId={id} />
          </Dialog>
        )}

        <PublishedAndUpdated publishedOn={createdAt} updatedOn={updatedAt} />
        <Text as="h1" size="2xl" heading>
          {name}
        </Text>
        <Text>{description}</Text>
        {resources.map(({ id, link, title, summary, description, section }) => (
          <ResourceItem
            key={id}
            id={id}
            link={link}
            title={title}
            summary={summary}
            description={description}
            section={section}
          />
        ))}

        {/* <CommentForm
          title={title}
          text="Do you know a resource that could benefit another reader and is relevent for this page? Let me know by leaving a short message below and I will take a look!"
        /> */}
      </Stack>
      {/* <Sidebar top={6.5} style={{ gridArea: 'quick-links' }}>
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
      </Sidebar> */}
    </Page>
  );
};

export default Resource;

export async function getStaticProps({ params }) {
  const { slug } = params;

  // the slug needs to match the name here
  const response = await prisma.resourceCollection.findUnique({
    where: { name: toTitleCase(slug) },
    include: {
      resources: true,
    },
  });
  const page = JSON.parse(JSON.stringify(response));
  // const quickLinks = table.map((row) => ({
  //   slug: toSlug(row.Title),
  //   title: row.Title,
  // }));

  return {
    props: {
      page,
      // blocks,
      // page,
      // quickLinks,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const response = await prisma.resourceCollection.findMany({
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
    fallback: false,
  };
}
