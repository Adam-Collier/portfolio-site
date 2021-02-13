/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs').promises;
const matter = require('gray-matter');
const { execSync } = require('child_process');
const globby = require('globby');

const getFiles = async () => {
  const files = await globby(
    `${__dirname}/content/blog/2020-12-16-tv-series-for-the-struggling-enthusiast/index.mdx`,
    {}
  );
  return files;
};

// function addFrontmatter(options) {
//   const transformer = (tree) => {
//     console.log(tree);
//     return visit(
//       tree,
//       (node) => node.type === 'yaml',
//       (node) => {
//         const currentYaml = node.data.parsedValue;

//         const updatedYaml = {
//           ...currentYaml,
//           updatedDate: gitDateUpdated,
//         };

//         node.value = Object.keys(updatedYaml)
//           .map((key) => `${key}: ${updatedYaml[key]}`)
//           .join('\n');
//       }
//     );
//   };
//   return transformer;
// }

const updateFrontmatter = async () => {
  const mdFilePaths = await getFiles();

  mdFilePaths.forEach(async (path) => {
    const gitDateUpdated = execSync(
      `git log -1 --pretty=format:%aI ${path}`
    ).toString();

    // get the file contents
    const file = matter.read(path);
    const { data: currentFrontmatter } = file;

    const updatedFrontmatter = {
      ...currentFrontmatter,
      updatedDate: gitDateUpdated,
    };

    file.data = updatedFrontmatter;

    const updatedFileContent = matter.stringify(file);
    fs.writeFile(path, updatedFileContent);
  });
};

updateFrontmatter();
