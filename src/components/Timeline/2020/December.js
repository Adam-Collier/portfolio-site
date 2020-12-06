import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { GitCommit, Box, Edit3, Scissors, Paperclip } from 'react-feather';
import Grid from '../../Grid';
import { TimelineEntry, DateEntry } from '../Entry';
import Button from '../../Button';
import CodeBlock from '../../CodeBlock';

const November = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(filter: { relativeDirectory: { eq: "timeline/2020/images" } }) {
        edges {
          node {
            childImageSharp {
              # Specify the image processing specifications right in the query.
              # Makes it trivial to update as your page's design changes.
              fluid(maxWidth: 300) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  return (
    <>
      <DateEntry date="December, 2020" />
      <TimelineEntry
        Icon={Scissors}
        timestamp="December 6, 2020"
        title="Added useMediaQuery Custom Hook Snippet"
      >
        <CodeBlock className="language-js">
          {`
import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
}
          `}
        </CodeBlock>
        <p>
          Taken from <a href="https://twitter.com/cassidoo">@cassidoo's</a> post{' '}
          <a href="https://www.netlify.com/blog/2020/12/05/building-a-custom-react-media-query-hook-for-more-responsive-apps">
            Building a custom React media query hook for more responsive apps
          </a>
        </p>
        <Button
          text="The full snippet"
          link="/snippets/#usemediaquery-custom-hook"
        />
      </TimelineEntry>
      <TimelineEntry
        Icon={Paperclip}
        timestamp="December 3, 2020"
        title="Operator Lookup Resource Added"
      >
        <p>
          Josh Comeau has created a great little tool to help us with those
          pesky operators, which are always a pain to Google.
        </p>
        <Button
          text="Check it out"
          link="https://www.joshwcomeau.com/operator-lookup?match=logical-or-assignment"
        />
      </TimelineEntry>
      <TimelineEntry
        Icon={Box}
        timestamp="December 2, 2020"
        title="Temple Ruins Render"
      >
        <p>
          Finished the second lesson of Polygon Runways 3-d illustrator course.
          This felt like a real step up from the previous lesson and I'm
          starting to get a feel for space and composition.
        </p>
        <Grid gridTemplateColumns="repeat(2, minmax(0, 1fr))" gridGap="0.5rem">
          <Image fluid={data.allFile.edges[1].node.childImageSharp.fluid} />
          <Image fluid={data.allFile.edges[0].node.childImageSharp.fluid} />
        </Grid>
      </TimelineEntry>
      <TimelineEntry
        Icon={GitCommit}
        timestamp="December 1, 2020"
        title="Timeline added to the homepage"
        divider={false}
      />
    </>
  );
};

export default November;
