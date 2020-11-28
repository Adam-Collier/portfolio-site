import React from 'react';
import { GitCommit } from 'react-feather';
import TimeLineEntry from '../Entry';

const November = () => (
  <>
    <TimeLineEntry
      Icon={GitCommit}
      timestamp="November 24, 2020"
      title="Added a Timeline to the homepage"
      divider={false}
    />
  </>
);

export default November;
