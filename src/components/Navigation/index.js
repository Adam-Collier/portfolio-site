import React from "react"
import NavLink from "../NavLink"

const Index = ({ styles, onClick }) => {
  return (
    <div
      className={styles}
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex="0"
    >
      <NavLink to="/blog">Blog</NavLink>
      <NavLink to="/snippets">Snippets</NavLink>
      <NavLink to="/resources">Resources</NavLink>
    </div>
  )
}

export default Index
