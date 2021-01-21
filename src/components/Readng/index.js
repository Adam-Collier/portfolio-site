import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Check, BookOpen } from 'react-feather';
import styles from './readng.module.css';

const Readng = () => {
  const {
    allFeedReadngRead,
    feedReadngCurrentlyReading,
  } = useStaticQuery(graphql`
    {
      feedReadngCurrentlyReading {
        id
        title
        creator
        link
      }
      allFeedReadngRead(limit: 3) {
        edges {
          node {
            id
            title
            creator
            link
          }
        }
      }
    }
  `);

  return (
    <>
      <p>
        {/* I'm current using <a href="https://beta.readng.co">Readng</a> to keep
        tabs on what I've read and enjoyed. Below are some of the recent books
        I've read and what I'm reading at the moment.  */}
        Want to know what I'm reading right now or looking for a new book to
        try? Here's exactly that, taken from my{' '}
        <a href="https://beta.readng.co">Readng</a>.
      </p>
      <Book node={feedReadngCurrentlyReading} />
      {allFeedReadngRead.edges.map(({ node }) => (
        <Book node={node} finished />
      ))}
    </>
  );
};

const Book = ({ node, finished }) => {
  const { title, creator, link } = node;

  const finishedClass = finished ? styles.finished : null;

  return (
    <a
      href={link}
      className={`${styles.book} ${finishedClass}`}
      target="__blank"
      rel="noopener noreferrer"
    >
      <p className={styles.title}>{title}</p>
      <p className={styles.author}>{creator}</p>

      <div className={styles.icon}>
        {finished ? <Check size={14} /> : <BookOpen size={14} />}
      </div>
    </a>
  );
};

export default Readng;
