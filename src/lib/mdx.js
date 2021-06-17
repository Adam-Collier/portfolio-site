import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

import remarkSlug from 'remark-slug';
import remarkAutolinkHeadings from 'remark-autolink-headings';

export const prepareMDX = async (slug, baseDir) => {
  // get the root directory
  const root = process.cwd();

  const filePath = join(root, baseDir, slug, 'index.mdx');
  const source = fs.readFileSync(filePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [
        // add slug values as header id's
        remarkSlug,
        // add links to the headers
        remarkAutolinkHeadings,
      ],
      rehypePlugins: [],
    },
    scope: data,
  });

  // TODO: handle dates here to return JSON
  return {
    source: mdxSource,
    frontMatter: data,
  };
};
