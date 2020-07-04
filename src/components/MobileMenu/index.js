import React from "react"

import Navigation from "../Navigation"
import { useContext } from "../../context"
import closeIcon from "../../icons/close_icon.svg"

import styles from "./mobilemenu.module.scss"

const Index = () => {
  const dispatch = useContext()[1]

  return (
    <div className={styles.menu}>
      <button
        onClick={() => dispatch({ type: "isMobileMenu" })}
        onKeyDown={() => dispatch({ type: "isMobileMenu" })}
      >
        <img src={closeIcon} alt="close icon" />
      </button>
      <Navigation
        styles={styles.navigation}
        onClick={() => dispatch({ type: "isMobileMenu" })}
      />
    </div>
  )
}

export default Index
