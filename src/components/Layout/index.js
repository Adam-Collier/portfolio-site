/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, navigate } from "gatsby"
import { useHotkeys } from "react-hotkeys-hook"
import { useContext } from "../../context"
import Pressure from "pressure"

import Header from "../Header"
import Footer from "../Footer"
import styles from "./layout.module.scss"
import "./global.scss"
import "../../styles/variables.scss"

const Layout = ({ children, location, className, container }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const dispatch = useContext()[1]
  useHotkeys("cmd+/", () => dispatch({ type: "isMenuVisible" }))
  useHotkeys("cmd+h", e => {
    e.preventDefault()
    navigate("/")
  })
  useHotkeys("cmd+shift+n", e => {
    e.preventDefault()
    navigate("/now")
  })
  useHotkeys("cmd+s", e => {
    e.preventDefault()
    navigate("/snippets")
  })
  useHotkeys("cmd+r", e => {
    e.preventDefault()
    navigate("/resources")
  })
  useHotkeys("cmd+b", e => {
    e.preventDefault()
    navigate("/blog")
  })

  const containerRef = useRef(null)

  useEffect(() => {
    Pressure.set(
      containerRef.current,
      {
        startDeepPress: function(event) {
          event.preventDefault()
          dispatch({ type: "isMobileMenuVisible" })
        },
        endDeepPress: function(event) {
          dispatch({ type: "isMobileMenuVisible", check: true })
        },
      },
      { only: "touch", preventSelect: false }
    )
  })

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} location={location} />
      <div ref={containerRef}>
        <main
          className={`${
            container === "fluid" ? styles.containerFluid : styles.container
          } ${className}`}
        >
          {children}
        </main>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
