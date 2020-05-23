import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"

import styles from "./index.module.scss"

import twitterIcon from "../icons/twitter.svg"
import spotifyIcon from "../icons/spotify.svg"
import letterboxdIcon from "../icons/letterboxd.svg"

const IndexPage = props => (
  <Layout className={styles.home}>
    <SEO title="Home" />
    <h4>
      Hey there{" "}
      <span role="img" aria-label="waving emoji">
        👋
      </span>{" "}
      I'm
    </h4>
    <h1>Adam Collier</h1>
    <h2>A UX lovin' Creative Designer &#x26; Developer</h2>
    <p>
      This site is as much for me as it is for you, it acts as a collection of
      thoughts, aha moments and tidbits of code which always seem to escape my
      little brain somehow. Have a cheeky gander and hit me up with anything...
      literally anything I’ve got time atm... (film recommendations, books and
      music are always encouraged).
    </p>
    <ul>
      <li>
        <a href="https://twitter.com/CollierAdam">
          <img src={twitterIcon} alt="twitter icon" />
        </a>
      </li>
      <li>
        <a href="https://open.spotify.com/user/1134435866?si=BeBEyLrhQUWPx0hijLZoZA">
          <img src={spotifyIcon} alt="spotify icon" />
        </a>
      </li>
      <li>
        <a href="https://letterboxd.com/mistapolnareff/">
          <img src={letterboxdIcon} alt="letterboxd icon" />
        </a>
      </li>
    </ul>
  </Layout>
)

export default IndexPage
