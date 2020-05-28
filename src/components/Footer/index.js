import React from "react"

import CommandMenu from "../CommandMenu"
import { useContext } from "../../context"

import helpIcon from "../../icons/help_icon.svg"
import styles from "./footer.module.scss"

const Index = () => {
  const [{ isMenuVisible }, dispatch] = useContext()

  return (
    <footer className={styles.footer}>
      <p>Hit cmd ? to see the shortcut menu</p>
      <img
        role="presentation"
        src={helpIcon}
        alt="help icon"
        onClick={() => dispatch({ type: "isMenuVisible" })}
        onKeyDown={() => dispatch({ type: "isMenuVisible" })}
      />
      <CommandMenu isMenuVisible={isMenuVisible} />
    </footer>
  )
}

export default Index
