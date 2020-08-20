import React from "react"
import { Link } from "gatsby"

import closeIcon from "../../icons/close_icon.svg"

import Navigation from "../Navigation"
import { useContext } from "../../context"
import { useTransition, animated } from "react-spring"

import styles from "./mobilemenu.module.scss"

const Index = ({ isMobileMenu }) => {
  const dispatch = useContext()[1]

  const transitions = useTransition(isMobileMenu, null, {
    from: {
      background: "var(--primary-accent)",
      maxHeight: "0px",
    },
    enter: {
      maxHeight: "500px",
    },
    leave: {
      maxHeight: "0px",
    },
  })

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div className={styles.menu} key={key} style={props}>
          <div className={styles.header}>
            <Link
              className={styles.headerLeft}
              style={{ color: "var(--primary-white)" }}
              to="/"
            >
              Adam Collier
            </Link>
            <button
              className={styles.closeButton}
              onClick={() => dispatch({ type: "isMobileMenu" })}
              onKeyDown={() => dispatch({ type: "isMobileMenu" })}
            >
              <img src={closeIcon} alt="close icon" />
            </button>
          </div>
          <Navigation
            className={styles.navigation}
            onClick={() => dispatch({ type: "isMobileMenu" })}
          />
        </animated.div>
      )
  )
}

export default Index
