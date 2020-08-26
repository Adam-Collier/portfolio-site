import React, { useEffect } from "react"
import { useContext } from "../../context"
import styles from "./toggle.module.css"

export default () => {
  const [{ isDarkMode }, dispatch] = useContext()

  useEffect(() => {
    dispatch({
      type: "isDarkMode",
      value: window.localStorage.getItem("isDarkMode") === "true",
    })
  }, [dispatch])

  return (
    <input
      type="checkbox"
      className={styles.toggle}
      checked={isDarkMode}
      onChange={() => dispatch({ type: "isDarkMode", value: !isDarkMode })}
    />
  )
}
