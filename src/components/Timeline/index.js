import React from 'react';

import { GitCommit } from 'react-feather';
import TimeLineEntry from './Entry';

import styles from './timeline.module.css';

const Timeline = () => (
  <div className={styles.timeline}>
    <TimeLineEntry
      Icon={GitCommit}
      timestamp="November 24, 2020"
      title="Moved Security Checklist to personal site"
    />
  </div>
);

export default Timeline;
