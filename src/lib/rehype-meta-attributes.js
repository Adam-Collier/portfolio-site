import visit from 'unist-util-visit';

var re = /\b([-\w]+)(?:=(?:"([^"]*)"|'([^']*)'|([^"'\s]+)))?/g;

module.exports = () => {
  return (tree) => {
    visit(tree, 'element', visitor);
  };

  function visitor(node, index, parentNode) {
    let match;

    if (node.tagName === 'code' && node.data && node.data.meta) {
      re.lastIndex = 0; // Reset regex.

      while ((match = re.exec(node.data.meta))) {
        node.properties[match[1]] = match[2] || match[3] || match[4] || '';
        parentNode.properties[match[1]] =
          match[2] || match[3] || match[4] || '';
      }
    }
  }
};
