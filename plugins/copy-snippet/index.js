const visit = require("unist-util-visit")
const qs = require("query-string")

module.exports = function gatsbyRemarkCodeButtons({ markdownAST }) {
  visit(markdownAST, "code", (node, index) => {
    const [language, params] = (node.lang || "").split(":")
    const actions = qs.parse(params)
    const { clipboard } = actions

    if (!language) {
      return
    }

    if (clipboard === "false") {
      delete actions["clipboard"]
    } else {
      let code = markdownAST.children[index].value
      code = code
        .replace(/"/gm, "&quot;")
        .replace(/`/gm, "\\`")
        .replace(/\$/gm, "\\$")

      const buttonNode = {
        type: "html",
        value: `
              <button class="gatsby-copy-snippet"
              onClick="copyToClipboard(this, \`${code}\`)"
              >
                Copy
              </button>
            `.trim(),
      }

      markdownAST.children.splice(index, 0, buttonNode)
      actions["clipboard"] = "false"
    }

    let newQuery = ""
    if (Object.keys(actions).length) {
      newQuery =
        `:` +
        Object.keys(actions)
          .map(key => `${key}=${actions[key]}`)
          .join("&")
    }

    node.lang = language + newQuery
  })
}
