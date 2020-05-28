import React from "react"
import { Link } from "gatsby"

import styles from "./navlink.module.scss"

const index = ({ children, to }) => {
  return (
    <Link to={to} className={styles.link} activeClassName={styles.active}>
      {children}
    </Link>
  )
}

export default index
