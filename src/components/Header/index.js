import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import { globalHistory } from "@reach/router"

import NavLink from "../NavLink"

import styles from "./header.module.scss"
import commandIcon from "../../icons/command_icon.svg"

const Header = () => {
  let path

  if ((globalHistory.location.pathname.match(/\//g) || []).length === 1) {
    path =
      globalHistory.location.pathname === "/"
        ? "Home"
        : globalHistory.location.pathname.slice(1).replace(/-/g, " ")
  } else {
    path = "Blogpost"
  }

  return (
    <header className={styles.header}>
      <div>
        <Link className={styles.home} to="/">
          Adam Collier
        </Link>
        <h4>{path}</h4>
        {path !== "Blogpost" && (
          <>
            <span>&#183;</span>
            <div>
              <img src={commandIcon} alt="command icon" />
              {path.includes("now") ? <h4>&#8679; </h4> : ""}
              <h4>{path.slice(0, 1).toUpperCase()}</h4>
            </div>
          </>
        )}
      </div>
      <div className={styles.navigation}>
        <NavLink to="/now">Now</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/snippets">Snippets</NavLink>
        <NavLink to="/resources">Resources</NavLink>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
