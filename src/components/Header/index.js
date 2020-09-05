import React from "react"
import { globalHistory } from "@reach/router"
import { Link } from "gatsby"

import Navigation from "../Navigation"
import PageUtils from "../PageUtils"
import Toggle from "../Toggle"
import { useContext } from "../../context"

import styles from "./header.module.css"
import MenuIcon from "../../icons/menu.svg"
import CloseIcon from "../../icons/close_icon.svg"

const Header = ({ className, isClose, onClick }) => {
  const dispatch = useContext()[1]

  let path = globalHistory.location.pathname

  return (
    <>
      <header className={`${styles.header} ${className ? className : ""}`}>
        <div className={styles.headerLeft}>
          <Link to="/" onClick={onClick ? onClick : null}>
            Adam Collier
          </Link>
          <PageUtils />
        </div>
        <div className={styles.headerRight}>
          <Navigation
            className={`${styles.navigation} ${
              path === "/" ? styles.navigationAlt : ""
            }`}
          />

          <Toggle className={styles.toggle} />
          <button
            className={styles.menuButton}
            onClick={() => dispatch({ type: "isMobileMenu" })}
            onKeyDown={() => dispatch({ type: "isMobileMenu" })}
          >
            {isClose ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>
    </>
  )
}

export default Header
