import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import { existsSync } from 'fs';
import { readdir, readFile } from 'fs/promises';

export const prepareMDX = async (source, files) => {
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    );
  }

  const { code } = await bundleMDX(source, {
    files,
  });

  return code;
};

export const getComponents = async (directory) => {
  const components = {};

  if (!existsSync(directory)) return components;

  const files = await readdir(directory);

  console.log(files);

  for (const file of files) {
    if (file.substr(-3) === 'jsx') {
      const fileBuffer = await readFile(path.join(directory, file));
      components[`./components/${file}`] = fileBuffer.toString().trim();
    }
  }

  return components;
};
