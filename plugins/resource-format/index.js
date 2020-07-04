const visit = require("unist-util-visit")
const toString = require("mdast-util-to-string")

module.exports = function gatsbyRemarkCodeButtons({ markdownAST }) {
  visit(markdownAST, "paragraph", (node, index) => {
    let text = toString(node)

    let sections = text.split(" - ")

    let { children } = node

    if (children[0].type === "link" && sections.length >= 3) {
      const { url } = node.children[0]
      const [title, type] = sections

      const [, ...descriptionNode] = children

      let description = descriptionNode
        .map(n => {
          if (n.type === "link") {
            return `
            <a href="${n.url}" >${n.children[0].value}</a>
          `
          }
          if (n.type === "text") {
            sanitisedText = n.value.replace(/^ - (.*?) - /g, "")
            return sanitisedText
          }
        })
        .join("")

      node.type = "html"
      node.children = undefined
      node.value = `
      <div class="resource">
        <div>
          <p><a href="${url}" target="_blank" rel="noopener noreferrer">${title}</a></p>
          <p>${type}</p>
        </div>
        <p>${description}</p>
      </div>
      `
    }

    return markdownAST
  })
}
