import React, { useState } from 'react';
import { Link, Check } from 'react-feather';
import styles from './sharepost.module.css';

const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const SharePost = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    const el = document.createElement(`textarea`);
    el.value = url;
    el.setAttribute(`readonly`, ``);
    el.style.position = `absolute`;
    el.style.left = `-9999px`;
    document.body.appendChild(el);
    el.select();
    document.execCommand(`copy`);
    document.body.removeChild(el);

    setCopied(true);

    await delay(2000);

    setCopied(false);
  };

  return (
    <div
      className={styles.share}
      onClick={handleClick}
      role="button"
      onKeyPress={handleClick}
      tabIndex={0}
    >
      <button type="button">
        {copied ? (
          <Check size={14} color="var(--primary-background)" />
        ) : (
          <Link size={14} color="var(--primary-background)" />
        )}
      </button>
      {copied ? <p>Copied!</p> : <p>Share this post! </p>}
    </div>
  );
};

export default SharePost;
