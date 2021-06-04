import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './blogpost.module.css';

const Blogpost = ({ title, date, slug, description, name }) => {
  const imageUrl = `/_posts/${name}/thumbnail.jpg`;

  console.log(imageUrl);

  return (
    <article className={styles.blogpost} key={slug}>
      <Link href={`/blog/${slug}`} aria-label={`blog post: ${title}`}>
        <a>
          {/* {extension === 'mp4' ? (
        <video autoPlay loop muted playsInline>
          <source src={publicURL} type="video/mp4" />
        </video>
      ) : (
        <GatsbyImage image={childImageSharp.gatsbyImageData} alt={title} />
      )} */}
          <Image src={imageUrl} alt={title} width={80} height={80} />
          <section>
            <h2>{title}</h2>
            <p>{description}</p>
            <small>{date}</small>
          </section>
        </a>
      </Link>
    </article>
  );
};

export default React.memo(Blogpost);
