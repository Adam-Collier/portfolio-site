import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"

import styles from "./index.module.css"

import Logo from "../icons/logo.svg"

const IndexPage = () => {
  return (
    <Layout
      wrapperClass={styles.homeWrapper}
      containerClass={`${styles.home}`}
      containerType="fluid"
    >
      <SEO title="" />
      <div className={styles.logo}>
        <Logo />
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
