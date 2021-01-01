import React, { useState } from 'react';
import styles from './tagfilter.module.css';

const TagFilter = ({ categories, allPosts, setFilteredPosts }) => {
  const [activeTags, setActiveTags] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();

    const tagName = e.target.textContent;

    const selectedTags = activeTags.includes(tagName)
      ? activeTags.filter((x) => x !== tagName)
      : [...activeTags, tagName];

    setActiveTags(selectedTags);

    const filteredPosts = allPosts.filter(({ node }) => {
      const { tags } = node.frontmatter;
      // if post doesnt have any tags return
      if (!tags) return false;
      // if there are no active tags return all posts
      if (selectedTags.length === 0) return node;
      // if selectedTags include a post tag return the tag
      const matchingTags = selectedTags.filter((tag) => tags.includes(tag));
      // if they have matching tags return the post
      return matchingTags.length >= 1;
    });

    setFilteredPosts(filteredPosts);
  };

  return categories.map(({ category, edges }, key) => {
    const allTags = new Set();
    edges.forEach(({ node }) => {
      node.frontmatter.tags.forEach((tag) => allTags.add(tag));
    });

    return (
      <div className={styles.category} key={key}>
        <span className={styles.categoryTitle}>{category}</span>
        <div className={styles.tags}>
          {[...allTags].map((tag, i) => (
            <button
              type="button"
              key={i}
              className={`${activeTags.includes(tag) ? styles.active : ''}`}
              onClick={handleClick}
              onKeyDown={handleClick}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    );
  });
};
export default TagFilter;
