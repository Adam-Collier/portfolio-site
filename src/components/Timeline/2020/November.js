import React from 'react';
import { Zap, GitCommit } from 'react-feather';
import TimeLineEntry from '../Entry';

const November = () => (
  <>
    <TimeLineEntry
      Icon={Zap}
      timestamp="November 24, 2020"
      title="Added a Timeline to the homepage"
      divider={false}
    />
  </>
);

export default November;
