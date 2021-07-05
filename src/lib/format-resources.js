import visit from 'unist-util-visit';
import toString from 'mdast-util-to-string';

export const formatResources = () => {
  const transform = (tree) => {
    visit(
      tree,
      (node) => node.type === 'paragraph' && node.children[0].type === 'link',
      (node) => {
        // turn the whole node into a string (including the link)
        const contentAsString = toString(node);
        // split the text at every dash
        const splitByDash = contentAsString.split(' - ');
        // get the children of the paragraph node (link and text)
        // the text here could have nested elements so we use the spread operator to capture them all
        const [link, ...text] = node.children;

        if (splitByDash.length >= 3) {
          // get the url from the first child
          const { url } = link;
          // destructure the title and type
          // we can't get the description here as we cant guarantee it doesn't contain any nested elements
          const [title, type] = splitByDash;

          // the text may contain some nested elements (like links) so we need to
          // loop through them and create each element
          const description = text
            .map((n) => {
              // if the element is a link return an a tag
              if (n.type === 'link')
                return `
                  <a href="${n.url}" >${n.children[0].value}</a>
                `;
              // if the element is text make sure the dashes are removed
              if (n.type === 'text')
                return n.value.replace(/^ - (.*?) - /g, '');
              // else return nothing
              return '';
            })
            .join('');

          node.type = 'html';
          node.children = [];
          node.value = `
            <div class="resource">
              <div>
                <p><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a></p>
                <p>${type}</p>
              </div>
              <p>${description}</p>
            </div>`;
        }

        return tree;
      }
    );
  };

  return transform;
};
