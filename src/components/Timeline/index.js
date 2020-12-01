import React from 'react';

import November from './2020/November';

import styles from './timeline.module.css';

const Timeline = ({ className }) => (
  <div className={`${className || ''} ${styles.timeline}`}>
    <November />
  </div>
);

export default Timeline;
