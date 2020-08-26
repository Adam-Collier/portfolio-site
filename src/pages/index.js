import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"

import styles from "./index.module.css"

import logo from "../icons/logo.svg"

import { useContext } from "../context"

const IndexPage = () => {
  const { isDarkMode } = useContext()[0]

  return (
    <Layout
      wrapperClass={styles.homeWrapper}
      containerClass={`${styles.home} ${isDarkMode ? styles.dark : ""}`}
      containerType="fluid"
    >
      <SEO title="Home" />
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.intro}>
        <p>
          This site is as much for me as it is for you, it acts as a collection
          of thoughts, aha moments and tidbits of code which always seem to
          escape my little brain somehow. Have a cheeky gander and hit me up
          with anything... literally anything I’ve got time atm... (film
          recommendations, books and music are always encouraged).
        </p>
      </div>
    </Layout>
  )
}

export default IndexPage
