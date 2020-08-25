import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"

import styles from "./blogpost.module.css"

const Index = ({ node }) => {
  const { title, date, description, thumbnail } = node.frontmatter
  const { slug } = node.fields

  const { childImageSharp, extension, publicURL } = thumbnail

  return (
    <Link to={slug} className={`${styles.blogpost}`}>
      <article key={slug}>
        {extension === "mp4" ? (
          <video autoPlay loop muted playsInline>
            <source src={publicURL} type="video/mp4" />
          </video>
        ) : (
          <Image fluid={childImageSharp.fluid} alt={title} />
        )}
        <section>
          <small>{date}</small>
          <h3>{title}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: description || node.excerpt,
            }}
          />
        </section>
      </article>
    </Link>
  )
}

export default Index
