/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs').promises;
const matter = require('gray-matter');
const { execSync } = require('child_process');
const globby = require('globby');

const getFiles = async () => {
  const files = await globby(`${__dirname}/content/**/*.{md,mdx}`, {});
  return files;
};

const updateFrontmatter = async () => {
  const mdFilePaths = await getFiles();

  mdFilePaths.forEach(async (path) => {
    const gitDateUpdated = execSync(
      `git log -1 --pretty=format:%aI ${path}`
    ).toString();

    const file = matter.read(path);
    const { data: currentFrontmatter } = file;

    const updatedFrontmatter = {
      ...currentFrontmatter,
      updatedOn: gitDateUpdated,
    };

    file.data = updatedFrontmatter;

    const updatedFileContent = matter.stringify(file);
    fs.writeFile(path, updatedFileContent);
  });
};

updateFrontmatter();
