import React, { useState } from "react"

import CommandMenu from "../CommandMenu"

import helpIcon from "../../icons/help_icon.svg"
import styles from "./footer.module.scss"

const Index = () => {
  const [isShowingMenu, setShowingMenu] = useState(false)

  return (
    <footer className={styles.footer}>
      <p>Hit cmd shift ? to see the shortcut menu</p>
      <img
        src={helpIcon}
        alt="help icon"
        onClick={() => setShowingMenu(!isShowingMenu)}
      />
      {isShowingMenu && <CommandMenu />}
    </footer>
  )
}

export default Index
