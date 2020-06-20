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
        onClick={() => dispatch({ type: "mobileMenuHide" })}
        onKeyDown={() => dispatch({ type: "mobileMenuHide" })}
      >
        <img src={closeIcon} alt="close icon" />
      </button>
      <Navigation
        styles={styles.navigation}
        onClick={() => dispatch({ type: "mobileMenuHide" })}
      />
    </div>
  )
}

export default Index
