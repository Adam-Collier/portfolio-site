import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Text from '../Text';
import Stack from '../Stack';

import styles from './blogpost.module.css';

const Blogpost = ({ title, date, slug, description, name }) => {
  const imageUrl = `/_posts/${name}/thumbnail.jpg`;

  console.log(imageUrl);

  return (
    <article className={styles.blogpost} key={slug}>
      <Link href={`/blog/${slug}`} aria-label={`blog post: ${title}`}>
        <a>
          <Image src={imageUrl} alt={title} width={80} height={80} />
          <Stack as="section" gap={0.25}>
            <Text as="h2" size="md" heading>
              {title}
            </Text>
            <Text size="sm">{description}</Text>
            <small>{date}</small>
          </Stack>
        </a>
      </Link>
    </article>
  );
};

export default React.memo(Blogpost);
