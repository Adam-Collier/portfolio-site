import React from 'react';

import December from './2020/December';

import styles from './timeline.module.css';

const Timeline = ({ className }) => (
  <div className={`${className || ''} ${styles.timeline}`}>
    <December />
  </div>
);

export default Timeline;
