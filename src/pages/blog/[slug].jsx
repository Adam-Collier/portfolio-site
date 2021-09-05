/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { MDXRemote } from 'next-mdx-remote';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import PublishedAndUpdated from '../../components/PublishedAndUpdated';
import Stack from '../../components/Stack';
import Page from '../../components/Page';
import Text from '../../components/Text';
import Form from '../../components/Form';
import Sidebar from '../../components/Sidebar/index.jsx';
import TableOfContents from '../../components/TableOfContents';
import SEO from '../../components/Seo';
import { prepareMDX } from '../../lib/mdx';
import { baseComponents } from '../../lib/base-components';
import { toTitleCase } from '../../utils/to-title-case';
import { getAllContentOfType } from '../../lib/blog';
import { resource } from '../../styles/global';
import { getHeadings } from '../../lib/table-of-contents';

const components = {
  Button: dynamic(() => import('../../components/Button')),
  FormNoStyles: dynamic(() =>
    import(
      '/_posts/add-a-form-to-your-gatsby-site-using-staticforms/components/FormNoStyles'
    )
  ),
  FormWithStyles: dynamic(() =>
    import(
      '/_posts/add-a-form-to-your-gatsby-site-using-staticforms/components/FormWithStyles'
    )
  ),
  Film: dynamic(() => import('../../components/Film')),
  FilmCover: dynamic(() => import('../../components/FilmCover')),
  Grid: dynamic(() => import('../../components/Grid')),
  ...baseComponents,
};

const Post = ({ source, title, slug, rawMDX, frontmatter }) => {
  const imageComponent = {
    img: ({ src, alt }) =>
      src.includes('https://') ? (
        <img src={src} alt={alt} />
      ) : (
        <Image
          src={require(`/_posts/${slug}/images/${src}.jpg`).default}
          alt={alt}
          placeholder="blur"
        />
      ),
  };

  const { description } = frontmatter;

  let featuredImage;

  try {
    featuredImage = require(`/_posts/${slug}/featured-image.jpg`).default.src;
  } catch {
    featuredImage = null;
  }

  const { headings } = getHeadings(rawMDX);

  return (
    <Page
      padding
      layout={frontmatter.sidebar === false ? 'stack' : 'grid'}
      areas={{ sm: `"content" "coffee"` }}
    >
      <SEO
        title={`${title} - Adam Collier`}
        description={description}
        image={featuredImage}
        pathname={`/blog/${slug}`}
      />
      <style jsx global>
        {resource}
      </style>
      <Stack maxWidth="sm" gap={1.45} style={{ gridArea: 'content' }}>
        <Stack gap={0.5}>
          <PublishedAndUpdated
            updatedOn={frontmatter.updatedOn}
            publishedOn={frontmatter.publishedOn}
          />
          <Text as="h1" size="2xl" heading>
            {title}
          </Text>
        </Stack>
        <MDXRemote
          {...source}
          components={{ ...components, ...imageComponent }}
        />
        <Form
          title={title}
          text="Please let me know if you found anything I wrote confusing, incorrect or
        outdated. Write a few words below and I will use your suggestions to
        improve this post."
        />
      </Stack>
      <Sidebar top={8}>
        <TableOfContents headings={headings} />
      </Sidebar>
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
