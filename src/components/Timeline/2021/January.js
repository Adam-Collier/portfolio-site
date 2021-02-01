import React from 'react';
import {
  GitPullRequest,
  GitMerge,
  BatteryCharging,
  Layout,
  Image,
  Paperclip,
  Box,
} from 'react-feather';
import { StaticImage } from 'gatsby-plugin-image';
import { TimelineEntry, DateEntry } from '../Entry';
import Button from '../../Button';
import Grid from '../../Grid';

const January = () => (
  <>
    <DateEntry date="January, 2021" />
    <TimelineEntry
      Icon={Box}
      timestamp="January 31, 2021"
      title="Detail Starting To Be Added"
    >
      <Grid gridTemplateColumns="repeat(2, minmax(0, 1fr))" gridGap="0.5rem">
        <StaticImage
          src="./images/cloud_66_31_01_21.jpg"
          layout="constrained"
          width={200}
          alt="Adam Collier Cloud 66 Blender"
        />
        <StaticImage
          src="./images/cloud_66_2_31_01_21.jpg"
          layout="constrained"
          width={200}
          alt="Adam Collier Cloud 66 Blender"
        />
      </Grid>
      <p>
        Made some progress on the detailing. Added a set of stairs and some
        floating industrial structures underneath each platform.
      </p>
    </TimelineEntry>
    <TimelineEntry
      Icon={Box}
      timestamp="January 30, 2021"
      title="Blender Course Progress"
    >
      <Grid gridTemplateColumns="repeat(2, minmax(0, 1fr))" gridGap="0.5rem">
        <StaticImage
          src="./images/cloud_66_30_01_21.jpg"
          layout="constrained"
          width={200}
          alt="Adam Collier Cloud 66 Blender"
        />
        <StaticImage
          src="./images/cloud_66_2_30_01_21.jpg"
          layout="constrained"
          width={200}
          alt="Adam Collier Cloud 66 Blender"
        />
      </Grid>
      <p>
        Starting to make some headway in Polygon Runway's Cloud 66 tutorial. The
        structures are starting to take shape and we will begin adding more
        detail to bring the scene to life.
      </p>
    </TimelineEntry>
    <TimelineEntry
      Icon={Paperclip}
      timestamp="January 29, 2021"
      title="Blender Resources Page Added"
    >
      <p>
        Remembering everything I'm learning from Polygon Runways{' '}
        <a href="https://polygonrunway.com/courses">course</a> can be difficult.
        So I've created a resources page where I'm going to start to document
        any shortcuts and bits I think could be handy.
      </p>
    </TimelineEntry>
    <TimelineEntry
      Icon={Image}
      timestamp="January 26, 2021"
      title="Gatsby Image Plugin Beta"
    >
      <p>
        Images on this site have been updated to use the new Gatsby Image beta
        plugin. This will have a lot of benefits going forward, including
        support for the new AVIF format.
      </p>
    </TimelineEntry>
    <TimelineEntry
      Icon={Layout}
      timestamp="January 22, 2021"
      title="New Homepage Layout"
    >
      <p>
        A new homepage layout which I'm feelin' pretty good about. Spotify and
        Readng cards have been added which will update on every build (since
        this is a Gatsby site).
      </p>
    </TimelineEntry>

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
