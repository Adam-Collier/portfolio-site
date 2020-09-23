import React from "react"
import { globalHistory } from "@reach/router"
import { Link, useStaticQuery } from "gatsby"
import Image from "gatsby-image"

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

  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "avatar.jpg" }) {
        childImageSharp {
          fixed(width: 32, height: 32) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <>
      <header className={`${styles.header} ${className ? className : ""}`}>
        <div className={styles.headerLeft}>
          <Link to="/" onClick={onClick ? onClick : null}>
            <Image
              className={styles.avatar}
              style={{ width: "28px", height: "28px" }}
              fixed={data.file.childImageSharp.fixed}
            />
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
