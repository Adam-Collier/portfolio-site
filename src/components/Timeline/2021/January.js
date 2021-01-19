import React from 'react';
import { GitPullRequest, GitMerge, BatteryCharging } from 'react-feather';
import { TimelineEntry, DateEntry } from '../Entry';
import Button from '../../Button';

const January = () => (
  <>
    <DateEntry date="January, 2021" />

    <TimelineEntry
      Icon={GitMerge}
      timestamp="January 1, 2021"
      title="RSS Feed Added"
    >
      <p>
        Suggested via a Twitter comment an RSS Feed has been added to the blog,
        making it easier to subscribe to content updates.
      </p>
      <Button
        Icon={GitPullRequest}
        text="Pull Request"
        link="https://github.com/Adam-Collier/portfolio-site/pull/54"
      />
    </TimelineEntry>
    <TimelineEntry
      Icon={BatteryCharging}
      timestamp="January 1, 2020"
      title="Recharging for the year ahead"
      divider={false}
    />
  </>
);

export default January;
