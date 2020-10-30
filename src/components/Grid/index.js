import React from "react"
import styles from "./grid.module.css"

const Grid = props => {
  const { children, ...gridStyles } = props

  return (
    <div className={styles.grid} style={{ ...gridStyles }}>
      {children}
    </div>
  )
}

export default Grid
