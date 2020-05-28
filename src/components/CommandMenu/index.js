import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useTransition, animated } from "react-spring"

import styles from "./commandMenu.module.scss"

const Index = ({ isMenuVisible }) => {
  const data = useStaticQuery(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/menu/" }) {
        html
      }
    }
  `)

  const { html } = data.markdownRemark

  const transitions = useTransition(isMenuVisible, null, {
    from: {
      opacity: 0,
      transform: "perspective(500px) translate3d(0,0,25px)",
    },
    enter: {
      opacity: 1,
      transform: "perspective(500px) translate3d(0,0,0px)",
    },
    leave: {
      opacity: 0,
      transform: "perspective(500px) translate3d(0,0,-50px)",
    },
  })

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div
          key={key}
          style={props}
          className={styles.commandMenu}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )
  )
}

export default Index
