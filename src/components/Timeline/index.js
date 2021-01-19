import React from 'react';

import December from './2020/December';
import January from './2021/January';

const Timeline = ({ className }) => (
  <div className={`${className || ''}`}>
    <January />
    {/* <December /> */}
  </div>
);

export default Timeline;
