import React from 'react';
import { Tool, Wind } from 'react-feather';
import { TimelineEntry, DateEntry } from '../Entry';

const February = () => (
  <>
    <DateEntry date="February, 2021" />
    <TimelineEntry
      Icon={Tool}
      timestamp="February 5, 2021"
      title="New Share Feature & Updated Post Info"
    >
      <p>
        A new Share button has been added to each post so you can easily share a
        post (if you like it). Now, if a post has been updated you will see an
        updated date rather than the published date.
      </p>
    </TimelineEntry>
    <TimelineEntry
      Icon={Wind}
      timestamp="February 1, 2020"
      title="Wow, January blew on by"
      divider={false}
    />
  </>
);

export default February;
