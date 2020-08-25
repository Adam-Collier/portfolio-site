import React from "react"
import styles from "./toggle.module.css"

export default () => {
  return (
    // <label className={styles.label}>
    //   <div className={styles.toggle}>
    //     <input
    //       className={styles.toggleState}
    //       type="checkbox"
    //       name="check"
    //       value="check"
    //     />
    //     <div className={styles.indicator}></div>
    //   </div>
    // </label>

    <input type="checkbox" className={styles.toggle} />
  )
}
