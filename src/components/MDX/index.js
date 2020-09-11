import React from "react"
// import { Link } from "gatsby"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import CodeBlock from "../CodeBlock"

export default ({ body }) => {
  const components = {
    pre: CodeBlock,
  }

  return (
    <MDXProvider components={components}>
      <MDXRenderer>{body}</MDXRenderer>
    </MDXProvider>
  )
}
