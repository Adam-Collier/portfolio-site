import React from "react"

import CommandMenu from "../CommandMenu"
import { useContext } from "../../context"
import { globalHistory } from "@reach/router"

import helpIcon from "../../icons/help_icon.svg"
import styles from "./footer.module.scss"

const Index = () => {
  const [{ isMenuVisible }, dispatch] = useContext()

  let path = globalHistory.location.pathname

  return (
    <footer className={styles.footer}>
      <p>Hit cmd ? to see the shortcut menu</p>
      <div className={`${styles.help} ${path === "/" ? styles.helpAlt : ""}`}>
        <img
          role="presentation"
          src={helpIcon}
          alt="help icon"
          onClick={() => dispatch({ type: "isMenuVisible" })}
          onKeyDown={() => dispatch({ type: "isMenuVisible" })}
        />
      </div>
      <CommandMenu isMenuVisible={isMenuVisible} />
    </footer>
  )
}

export default Index
