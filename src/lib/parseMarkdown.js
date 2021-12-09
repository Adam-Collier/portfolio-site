import { unified } from "unified";
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

export const parseMarkdown = (markdown) => {
	let processor = unified()
		.use(remarkParse) // Parse markdown content to a syntax tree
		.use(remarkRehype) // Turn markdown syntax tree to HTML syntax tree, ignoring embedded HTML
		.use(rehypeExternalLinks)
		.use(rehypeSanitize)
		.use(rehypeStringify) // Serialize HTML syntax tree
	
	let html = processor.processSync(markdown);

	return html;
}