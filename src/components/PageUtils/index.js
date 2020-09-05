import React from "react"
import { globalHistory } from "@reach/router"

import styles from "./pageutils.module.css"

const PageUtils = () => {
  const getPath = relativePath => {
    let pathMappings = {
      "/": "Home",
      "/blog/": "Blogpost",
      "/resources/": "Resource",
      default: relativePath.slice(1).replace(/-/g, " "),
    }
    return pathMappings[relativePath] || pathMappings["default"]
  }

  let url = globalHistory.location.pathname.split("/")
  // remove the end of the url so it is easier to match
  const shortenedUrl = url.filter((x, i) => i !== 2).join("/")

  let path = getPath(shortenedUrl)

  return (
    <>
      <h4 className={styles.breadcrumbs}>{path}</h4>
      {(shortenedUrl.match(/\//g) || []).length !== 2 && (
        <div className={styles.shortcut}>
          <span>&#183;</span>
          <div>
            <h4>⌘{path.slice(0, 1).toUpperCase()}</h4>
          </div>
        </div>
      )}
    </>
  )
}

export default PageUtils
