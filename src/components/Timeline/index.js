import React from 'react';

import December from './2020/December';
import January from './2021/January';

import styles from './timeline.module.css';

const Timeline = ({ className }) => (
  <div className={`${className || ''} ${styles.timeline}`}>
    <January />
    <December />
  </div>
);

export default Timeline;
