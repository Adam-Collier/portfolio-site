import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import CodeBlock from '../CodeBlock';

const MDX = ({ body }) => {
  const components = {
    pre: CodeBlock,
  };

  return (
    <MDXProvider components={components}>
      <MDXRenderer>{body}</MDXRenderer>
    </MDXProvider>
  );
};

export default MDX;
