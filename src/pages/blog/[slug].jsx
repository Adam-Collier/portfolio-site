import fs from 'fs';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import dynamic from 'next/dynamic';
import { join } from 'path';
import CodeBlock from '../../components/CodeBlock';

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
  pre: (props) => <CodeBlock {...props} />,
};

const Post = ({ post, source }) => {
  console.log(post, 'this is the post prop');
  return <MDXRemote {...source} components={components} />;
};

export default Post;

export async function getStaticProps({ params }) {
  // get the root directory
  const root = process.cwd();

  const filePath = join(root, '_posts', params.slug, 'index.mdx');
  const source = fs.readFileSync(filePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
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
