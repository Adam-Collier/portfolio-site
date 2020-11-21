const visit = require('unist-util-visit');
const toString = require('mdast-util-to-string');

module.exports = function gatsbyRemarkFormatResources({ markdownAST }) {
  visit(
    markdownAST,
    (node) => node.type === 'paragraph' && node.children[0].type === 'link',
    (node, index) => {
      const text = toString(node);

      const sections = text.split(' - ');

      const { children } = node;

      if (sections.length >= 3) {
        const { url } = node.children[0];
        const [title, type] = sections;

        const [, ...descriptionNode] = children;

        const description = descriptionNode
          .map((n) => {
            if (n.type === 'link') {
              return `
            <a href="${n.url}" >${n.children[0].value}</a>
          `;
            }
            if (n.type === 'text') {
              sanitisedText = n.value.replace(/^ - (.*?) - /g, '');
              return sanitisedText;
            }
          })
          .join('');

        node.type = 'html';
        node.children = [];
        node.value = `<div class="resource">
        <div>
          <p><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a></p>
          <p>${type}</p>
        </div>
        <p>${description}</p>
      </div>`;
      }

      return markdownAST;
    }
  );
};
