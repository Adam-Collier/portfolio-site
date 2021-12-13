import React from "react";
import { unified } from "unified";
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import rehypeReact from 'rehype-react';
import CodeBlock from "../components/CodeBlock"
import Text from "../components/Text";

export const toHTML = (markdown) => {
	let processor = unified()
		.use(remarkParse) // Parse markdown content to a syntax tree
		.use(remarkRehype) // Turn markdown syntax tree to HTML syntax tree, ignoring embedded HTML
		.use(rehypeExternalLinks)
		.use(rehypeSanitize)
		.use(rehypeStringify) // Serialize HTML syntax tree
	
	let html = processor.processSync(markdown);

	return html;
}

export const toReact = (markdown) => {
	let processor = unified()
    .use(remarkParse) // Parse markdown content to a syntax tree
    .use(remarkRehype) // Turn markdown syntax tree to HTML syntax tree, ignoring embedded HTML
    .use(rehypeExternalLinks)
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        code: (props) => <CodeBlock {...props} />,
		p: Text
      },
    });

  let Component = processor.processSync(markdown).result;

  return Component;
}