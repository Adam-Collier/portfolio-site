import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

export const prepareMDX = async (params, baseDir) => {
  // get the root directory
  const root = process.cwd();

  const filePath = join(root, baseDir, params.slug, 'index.mdx');
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

  // TODO: handle dates here to return JSON
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
};
