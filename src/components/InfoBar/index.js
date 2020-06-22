import React from "react"
import { useTransition, animated } from "react-spring"

import { useContext } from "../../context"
import closeIcon from "../../icons/close_icon.svg"

import styles from "../InfoBar/infobar.module.scss"

const Index = () => {
  const [{ isInfo }, dispatch] = useContext()

  const transitions = useTransition(isInfo, null, {
    from: {
      transform: "translate3d(0,100px,0)",
    },
    enter: {
      transform: "translate3d(0,0,0)",
    },
    leave: {
      transform: "translate3d(0,100px,0)",
    },
  })

  return (
    <>
      <p className={styles.info} onClick={() => dispatch({ type: "isInfo" })}>
        i
      </p>

      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props} className={styles.menu}>
              <p>To open the menu hard press on any page</p>
              <img
                src={closeIcon}
                alt="close icon"
                onClick={() => dispatch({ type: "isInfo" })}
              />
            </animated.div>
          )
      )}
    </>
  )
}

export default Index
