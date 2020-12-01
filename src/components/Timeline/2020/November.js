import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { GitCommit, Box, Edit3, Scissors } from 'react-feather';
import Grid from '../../Grid';
import { TimelineEntry, DateEntry } from '../Entry';
import Blogpost from '../../Blogpost';
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
      mdx(slug: { regex: "/5-of-my-all-time-favourite-films/" }) {
        excerpt(pruneLength: 400)
        fields {
          slug
          title
          date(formatString: "MMMM DD, YYYY")
        }
        frontmatter {
          thumbnail {
            publicURL
            extension
            childImageSharp {
              fluid(maxWidth: 114, quality: 90, toFormat: JPG) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  `);

  return (
    <>
      <DateEntry date="November, 2020" />
      <TimelineEntry
        Icon={Scissors}
        timestamp="November 30, 2020"
        title="Added a new snippet to React"
      >
        <CodeBlock className="language-css">
          {`
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* This is better for small screens, once min() is better supported */
  /* grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr)); */
  grid-gap: 1rem;
  /* This is the standardized property now, but has slightly less support */
  /* gap: 1rem */
} 
            `}
        </CodeBlock>
      </TimelineEntry>
      <TimelineEntry
        Icon={Edit3}
        timestamp="November 29, 2020"
        title="Published New Blog Post"
      >
        <Blogpost node={data.mdx} timeline />
      </TimelineEntry>
      <TimelineEntry
        Icon={Box}
        timestamp="November 28, 2020"
        title="Temple Ruins render"
      >
        <p>
          Finished the second lesson of Polygon Runways 3-d illustrator course.
          This felt like a real step up from the previous lesson and I'm
          starting to get a feel for space and composition.
        </p>
        <Grid gridTemplateColumns="repeat(2, minmax(0, 1fr))" gridGap="0.5rem">
          <Image fluid={data.allFile.edges[0].node.childImageSharp.fluid} />
          <Image fluid={data.allFile.edges[1].node.childImageSharp.fluid} />
        </Grid>
      </TimelineEntry>
      <TimelineEntry
        Icon={GitCommit}
        timestamp="November 24, 2020"
        title="Timeline added to the homepage"
        divider={false}
      />
    </>
  );
};

export default November;
