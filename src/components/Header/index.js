import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import { globalHistory } from "@reach/router"
import { useContext } from "../../context"

import Navigation from "../Navigation"
import MobileMenu from "../MobileMenu"

import styles from "./header.module.scss"
import commandIcon from "../../icons/command_icon.svg"

const Header = () => {
  const { isMobileMenuVisible } = useContext()[0]

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
      <header className={styles.header}>
        <div>
          <Link className={styles.home} to="/">
            Adam Collier
          </Link>
          <h4 className={styles.breadcrumbs}>{path}</h4>
          {(shortenedUrl.match(/\//g) || []).length !== 2 && (
            <div className={styles.shortcut}>
              <span>&#183;</span>
              <div>
                <img src={commandIcon} alt="command icon" />
                {path.includes("now") ? <h4>&#8679; </h4> : ""}
                <h4>{path.slice(0, 1).toUpperCase()}</h4>
              </div>
            </div>
          )}
        </div>
        <Navigation styles={styles.navigation} />
        <p className={styles.info}>i</p>
      </header>
      {isMobileMenuVisible && <MobileMenu />}
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
