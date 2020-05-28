/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

const React = require("react")
const { StateProvider } = require("./src/context")

exports.wrapRootElement = ({ element }) => {
  return <StateProvider>{element}</StateProvider>
}
