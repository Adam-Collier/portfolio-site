import React from "react"
import Navigation from "../Navigation"
import { useContext } from "../../context"
import CloseIcon from "../../icons/close_icon.svg"

import styles from "./mobilemenu.module.scss"

const Index = () => {
  const dispatch = useContext()[1]

  return (
    <div className={styles.menu}>
      <CloseIcon onClick={() => dispatch({ type: "mobileMenuHide" })} />
      <Navigation
        styles={styles.navigation}
        onClick={() => dispatch({ type: "mobileMenuHide" })}
      />
    </div>
  )
}

export default Index
