import { bundleMDX } from 'mdx-bundler';
import path from 'path';

export const prepareMDX = async (source, options) => {
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

  const { directory } = options;

  const { code } = await bundleMDX(source, {
    cwd: directory,
  });

  return code;
};
