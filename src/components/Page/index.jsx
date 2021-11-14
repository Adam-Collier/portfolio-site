import React from 'react';
import { styled } from 'goober';
import Stack from '../Stack';
import Grid from '../Grid';

const Page = ({
  children,
  layout = 'stack',
  gap = 1.45,
  padding,
  paddingTop = 6,
  areas = {},
}) => {
  const defaultAreas = {
    default: `'sidebar content' 'sidebar footer'`,
    sm: `'content'`,
  };

  const LAYOUT_OPTIONS = {
    grid: {
      component: Grid,
      props: {
        maxWidth: 'lg',
        areas: {
          ...defaultAreas,
          ...areas,
        },
        columns: {
          default: '300px minmax(0, 1fr)',
          sm: '100%',
          md: '175px minmax(0, 1fr)',
        },
        gap: '2rem',
      },
    },
    stack: {
      component: Stack,
      props: {
        gap,
        maxWidth: 'sm',
      },
    },
  };

  const { component: Layout, props } = LAYOUT_OPTIONS[layout];

  // extract the maxWidth so it's only used for the Wrapper styles
  const { maxWidth, ...rest } = props;

  const Wrapper = styled(Layout)`
    padding-top: ${(p) => `${p.$paddingTop}rem`};

    ${(p) =>
      p.$padding &&
      `
      padding-left: 1rem;  
      padding-right: 1rem; 

      max-width: calc(var(--width-${p.$maxWidth}) + 2rem);
      margin-left: auto;
      margin-right: auto;
      width: 100%;
    `}
  `;

  return (
    <Wrapper
      $maxWidth={maxWidth}
      $paddingTop={paddingTop}
      $padding={padding}
      {...rest}
    >
      {children}
    </Wrapper>
  );
};

export default Page;
