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
  const postData = {
    ...data,
    slug,
    title,
    content,
    name,
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

export const getAllContentOfType = async (contentBaseDir, fields = []) => {
  // lets grab all of the post directories
  // using withFileTypes returns and array of dirents
  const allPostDirs = fs.readdirSync(join(root, contentBaseDir), {
    withFileTypes: true,
  });

  return allPostDirs.flatMap((postDir) => {
    if (postDir.isFile()) return [];
    const contentDirName = postDir.name;
    return getContentBySlug(contentBaseDir, contentDirName, fields);
  });
};