// Install gray-matter and date-fns
import matter from 'gray-matter';
import { join } from 'path';
import fs from 'fs';
import { toTitleCase } from '../utils/to-title-case';

// get the root directory
const root = process.cwd();

// we use the filenames here because our slugs differ from our file names
export const getContentBySlug = (baseDir, name, fields = []) => {
  // read the mdx file inside the directory
  // not the nicest but we are joining our path together here
  const fileContent = fs.readFileSync(
    join(root, baseDir, name, 'index.mdx'),
    'utf-8'
  );

  // grab the frontmatter using graymatter
  const { data, content } = matter(fileContent);

  // create the slug
  const slug = name.toLowerCase();
  // create the title using our util function
  const title = toTitleCase(slug);

  // bring all of the data together
  // prioritise frontmatter values so we can overwrite when needed to
  const postData = {
    title,
    slug,
    content,
    ...data,
  };

  const items = {};

  // return only the fields needed
  fields.forEach((field) => {
    if (postData[field]) {
      items[field] = postData[field];
    }
  });

  return items;
};

export const getAllContentOfType = async (
  contentBaseDir,
  fields = [],
  options
) => {
  // lets grab all of the post directories
  // using withFileTypes returns and array of dirents
  const allDirs = fs.readdirSync(join(root, contentBaseDir), {
    withFileTypes: true,
  });

  // TODO: reduce number of posts in array so we don't need to loop over them all
  // let count = 0;

  const allContent = allDirs
    .flatMap((dir) => {
      if (dir.isFile()) return [];
      const contentDirName = dir.name;

      return getContentBySlug(contentBaseDir, contentDirName, fields);
    })
    // sort by date here
    .sort((a, b) =>
      new Date(a.publishedOn) > new Date(b.publishedOn) ? -1 : 1
    );

  return options?.limit ? allContent.slice(0, options.limit) : allContent;
};
