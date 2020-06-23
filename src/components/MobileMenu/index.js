import React from "react"
import { useTransition, animated } from "react-spring"

import Navigation from "../Navigation"
import { useContext } from "../../context"
import closeIcon from "../../icons/close_icon.svg"

import styles from "./mobilemenu.module.scss"

const Index = () => {
  const [{ isMobileMenuVisible }, dispatch] = useContext()

  const transitions = useTransition(isMobileMenuVisible, null, {
    from: {
      opacity: 0,
      visibility: "hidden",
      transform: "scale(0.95)",
    },
    enter: {
      opacity: 1,
      visibility: "visible",
      transform: "scale(1)",
    },
    leave: {
      opacity: 0,
      visibility: "hidden",
      transform: "scale(0.95)",
    },
  })

  return transitions.map(
    ({ item, props, key }) =>
      item && (
        <animated.div key={key} style={props} className={styles.menu}>
          <button
            onClick={() => dispatch({ type: "mobileMenuHide" })}
            onKeyDown={() => dispatch({ type: "mobileMenuHide" })}
          >
            <img src={closeIcon} alt="close icon" />
          </button>
          <Navigation
            styles={styles.navigation}
            onClick={() => dispatch({ type: "mobileMenuHide" })}
          />
        </animated.div>
      )
  )
}

export default Index
