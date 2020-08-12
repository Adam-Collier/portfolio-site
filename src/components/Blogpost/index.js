import React from "react"
import { Link } from "gatsby"
import Image from "gatsby-image"

import styles from "./blogpost.module.scss"

const Index = ({ node, noThumbnail }) => {
  const { title, date, description, thumbnail } = node.frontmatter
  console.log(thumbnail, "this is the thumbnail")
  const { slug } = node.fields

  const { childImageSharp, extension, publicURL } = thumbnail

  return (
    <Link
      to={slug}
      className={`${styles.blogpost} ${noThumbnail ? styles.noThumbnail : ""}`}
    >
      <article key={slug}>
        {extension === "mp4" ? (
          <video autoPlay loop muted playsInline>
            {/* <source src="my-animation.webm" type="video/webm" /> */}
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
