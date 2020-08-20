import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, navigate } from "gatsby"
import { useHotkeys } from "react-hotkeys-hook"
import { useContext } from "../../context"

import Header from "../Header"
import Footer from "../Footer"
import styles from "./layout.module.scss"
import "./global.scss"
import "../../styles/variables.scss"

const Layout = ({ children, wrapperClass, containerClass, containerType }) => {
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

  return (
    <div className={wrapperClass}>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main
        className={`${
          containerType === "fluid" ? styles.containerFluid : styles.container
        } ${containerClass}`}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
