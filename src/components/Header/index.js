import React from "react"
import { globalHistory } from "@reach/router"
import { Link } from "gatsby"

import Navigation from "../Navigation"
import PageUtils from "../PageUtils"
import { useContext } from "../../context"

import styles from "./header.module.scss"
import menuIcon from "../../icons/menu.svg"

const Header = () => {
  const dispatch = useContext()[1]

  let path = globalHistory.location.pathname

  return (
    <>
      <header className={`${styles.header}`}>
        <div className={styles.headerLeft}>
          <Link to="/">Adam Collier</Link>
          <PageUtils />
        </div>
        <Navigation
          className={`${styles.navigation} ${
            path === "/" ? styles.navigationAlt : ""
          }`}
        />
        <button
          className={styles.menuButton}
          onClick={() => dispatch({ type: "isMobileMenu" })}
          onKeyDown={() => dispatch({ type: "isMobileMenu" })}
        >
          <img src={menuIcon} alt="menu icon" />
        </button>
      </header>
    </>
  )
}

export default Header
