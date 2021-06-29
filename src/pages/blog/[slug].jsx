/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { MDXRemote } from 'next-mdx-remote';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Stack from '../../components/Stack';
import Page from '../../components/Page';
import Text from '../../components/Text';
import { prepareMDX } from '../../lib/mdx';
import { baseComponents } from '../../lib/base-components';
import { toTitleCase } from '../../utils/to-title-case';

import { getAllContentOfType } from '../../lib/blog';

const components = {
  Button: dynamic(() => import('../../components/Button')),
  FormNoStyles: dynamic(() =>
    import(
      '../../../_posts/add-a-form-to-your-Gatsby-site-using-Staticforms/components/FormNoStyles'
    )
  ),
  FormWithStyles: dynamic(() =>
    import(
      '../../../_posts/add-a-form-to-your-Gatsby-site-using-Staticforms/components/FormWithStyles'
    )
  ),
  Film: dynamic(() => import('../../components/Film')),
  FilmCover: dynamic(() => import('../../components/FilmCover')),
  Grid: dynamic(() => import('../../components/Grid')),
  ...baseComponents,
};

const Post = ({ source, title, slug }) => {
  const image = {
    img: ({ src, alt }) => (
      <Image
        src={require(`/_posts/${slug}/images/${src}.jpg`)}
        alt={alt}
        placeholder="blur"
      />
    ),
  };

  return (
    <Page padding layout="grid">
      <Stack maxWidth="sm" gap={1.45} style={{ gridArea: 'content' }} padding>
        <Text as="h1" size="2xl" heading>
          {title}
        </Text>
        <MDXRemote {...source} components={{ ...components, ...image }} />
      </Stack>
    </Page>
  );
};

export default Post;

export async function getStaticProps({ params }) {
  const { slug } = params;
  const mdx = await prepareMDX(slug, '_posts');

  const title = toTitleCase(slug);

  return {
    props: {
      ...mdx,
      title,
      slug,
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllContentOfType('_posts', ['slug']);

  return {
    paths: allPosts.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: false,
  };
}
