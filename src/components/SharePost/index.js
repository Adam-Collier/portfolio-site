import React, { useState } from 'react';
import { Link, Check } from 'react-feather';
import Text from '../Text';
import styles from './sharepost.module.css';

const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const SharePost = () => {
  const [copied, setCopied] = useState(false);

  let url = '';

  if (typeof window !== 'undefined') {
    [url] = window.location.href.split('?');
  }

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
        {copied ? <Check size={14} /> : <Link size={14} />}
      </button>
      {copied ? (
        <Text size="sm">Copied!</Text>
      ) : (
        <Text size="sm">Share this post!</Text>
      )}
    </div>
  );
};

export default SharePost;
