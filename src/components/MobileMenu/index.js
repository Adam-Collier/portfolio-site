import React from "react"

import Navigation from "../Navigation"
import { useContext } from "../../context"
import closeIcon from "../../icons/close_icon.svg"

import styles from "./mobilemenu.module.scss"

const Index = () => {
  const dispatch = useContext()[1]

  return (
    <div className={styles.menu}>
      <Navigation
        styles={styles.navigation}
        onClick={() => dispatch({ type: "isMobileMenu" })}
      />
    </div>
  )
}

export default Index
