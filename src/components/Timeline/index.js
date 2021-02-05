import React from 'react';

// import December from './2020/December';
import January from './2021/January';
import February from './2021/February';

const Timeline = ({ className }) => (
  <div className={`${className || ''}`}>
    <February />
    <January />
    {/* <December /> */}
  </div>
);

export default Timeline;
