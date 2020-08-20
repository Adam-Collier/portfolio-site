import React from "react"
import { globalHistory } from "@reach/router"
import { Link } from "gatsby"

import Navigation from "../Navigation"
import PageUtils from "../PageUtils"
import MobileMenu from "../MobileMenu"
import { useContext } from "../../context"

import styles from "./header.module.scss"
import menuIcon from "../../icons/menu.svg"

const Header = () => {
  const [{ isMobileMenu }, dispatch] = useContext()

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
      <MobileMenu isMobileMenu={isMobileMenu} />
    </>
  )
}

export default Header
