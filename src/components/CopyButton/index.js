import React, { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './copybutton.module.css';

const copyToClipboard = (content) => {
  const el = document.createElement(`textarea`);
  el.value = content;
  el.setAttribute(`readonly`, ``);
  el.style.position = `absolute`;
  el.style.left = `-9999px`;
  document.body.appendChild(el);
  el.select();
  document.execCommand(`copy`);
  document.body.removeChild(el);
};

const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

function Copy({ className, content, duration = 2000, fileName, trim = false }) {
  const [copied, setCopied] = useState(false);

  const label = copied
    ? `${fileName ? `${fileName} ` : ``}copied to clipboard`
    : `${fileName ? `${fileName}: ` : ``}copy code to clipboard`;

  return (
    <button
      type="button"
      name={label}
      className={`${className} ${styles.button}`}
      disabled={copied}
      onClick={async () => {
        copyToClipboard(trim ? content.trim() : content);

        setCopied(true);

        await delay(duration);

        setCopied(false);
      }}
    >
      {copied ? `🎉 Copied!` : `Copy`}
    </button>
  );
}

Copy.propTypes = {
  content: PropTypes.string.isRequired,
  duration: PropTypes.number,
  trim: PropTypes.bool,
};

export default Copy;
