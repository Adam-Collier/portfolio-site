// Install gray-matter and date-fns
import matter from 'gray-matter';
import { join } from 'path';
// import { parseISO, format } from 'date-fns';
import fs from 'fs';

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
  // replace the dashes with spaces
  const spacedName = name.replace(/-/g, ' ');
  // capitalise the first letter
  const title = spacedName.charAt(0).toUpperCase() + spacedName.slice(1);

  // bring all of the data together
  // prioritise frontmatter values so we can overwrite when needed to
  const postData = {
    slug,
    title,
    content,
    name,
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
  const allPostDirs = fs.readdirSync(join(root, contentBaseDir), {
    withFileTypes: true,
  });

  // TODO: reduce number of posts in array so we don't need to loop over them all
  let count = 0;

  return allPostDirs.flatMap((postDir) => {
    if (postDir.isFile()) return [];
    const contentDirName = postDir.name;
    count += 1;

    if (options?.limit && count > options.limit) {
      return [];
    }

    return getContentBySlug(contentBaseDir, contentDirName, fields);
  });
};
