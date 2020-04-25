import PropTypes from "prop-types"
import React from "react"
import { Link } from "gatsby"
import { globalHistory } from "@reach/router"
import styles from "./header.module.scss"
import commandIcon from "../../icons/command_icon.svg"

const Header = () => {
  console.log(globalHistory.location.pathname)
  let path =
    globalHistory.location.pathname === "/"
      ? "Home"
      : globalHistory.location.pathname.slice(1).replace(/-/g, " ")

  return (
    <header className={styles.header}>
      <div>
        <Link className={styles.home} to="/">
          Adam Collier
        </Link>
        <h4>{path}</h4>
        <span>&#183;</span>
        <div>
          <img src={commandIcon} alt="command icon" />
          <h4>{path.slice(0, 1).toUpperCase()}</h4>
        </div>
      </div>
      <div className={styles.navigation}>
        <Link to="/now">Now</Link>
        <Link to="/writing">Writing</Link>
        <Link to="/side-projects">Side Projects</Link>
        <Link to="/playground">Playground</Link>
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