import React from "react"

import helpIcon from "../../icons/help_icon.svg"
import styles from "./footer.module.scss"

const Index = () => {
  return (
    <footer className={styles.footer}>
      <p>Hold cmd to see the shortcut menu</p>
      <img src={helpIcon} alt="help icon" />
    </footer>
  )
}

export default Index
