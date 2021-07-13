import React, { useState } from 'react';
import { Share, Check } from 'react-feather';
import Stack from '../Stack';
import Text from '../Text';
import Button from '../Button';

const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const SharePost = ({ text = 'Share this post!', layout }) => {
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
    <Stack gap={1.45}>
      <Text size="sm">
        If you enjoyed reading this content help spread the word by copying the
        link and sharing it.
      </Text>
      <Button
        text={copied ? 'Copied the Link!' : text}
        Icon={copied ? Check : Share}
        onClick={handleClick}
        onKeyPress={handleClick}
        type="secondary"
        layout={layout}
      />
    </Stack>
  );
};

export default SharePost;
