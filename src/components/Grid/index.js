import React from "react"
import styles from "./grid.module.css"

const Grid = props => {
  console.log(props)

  const { children, ...gridStyles } = props

  console.log({ ...gridStyles })

  return (
    <div className={styles.grid} style={{ ...gridStyles }}>
      {children}
    </div>
  )
}

export default Grid
