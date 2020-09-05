import React from "react"

import Toggle from "../Toggle"
import CommandMenu from "../CommandMenu"
import { useContext } from "../../context"

import HelpIcon from "../../icons/help_icon.svg"
import styles from "./footer.module.css"

const Index = () => {
  const [{ isMenuVisible }, dispatch] = useContext()

  return (
    <footer className={styles.footer}>
      <div className={styles.help}>
        <HelpIcon onClick={() => dispatch({ type: "isMenuVisible" })} />
      </div>
      <Toggle />
      <CommandMenu isMenuVisible={isMenuVisible} />
    </footer>
  )
}

export default Index
