import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useTransition, animated } from "react-spring"
import MDX from "../MDX"

import styles from "./commandMenu.module.css"

const Index = ({ isMenuVisible }) => {
  const data = useStaticQuery(graphql`
    query {
      mdx(fileAbsolutePath: { regex: "/menu/" }) {
        body
      }
    }
  `)

  const { body } = data.mdx

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
        <animated.div key={key} style={props} className={styles.commandMenu}>
          <MDX body={body} />
        </animated.div>
      )
  )
}

export default Index
