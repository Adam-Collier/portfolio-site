import React from 'react';
import { styled } from 'goober';
import Stack from '../Stack';
import { queries } from '../../config';

const responsiveProps = (propValue, cssPropertyName) => {
  if (!propValue) return;

  if (typeof propValue === 'string') return `${cssPropertyName}: ${propValue};`;

  // check if the value is an object
  // taken from https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript/8511350#8511350
  if (
    typeof propValue === 'object' &&
    !Array.isArray(propValue) &&
    propValue !== null
  ) {
    const css = {};

    const sizesSortedAlphabetically = Object.entries(propValue).sort((a, b) =>
      // sort the sized alphabetically so the media queries are in the correct order
      a[0].localeCompare(b[0])
    );

    for (const [size, value] of sizesSortedAlphabetically) {
      if (size === 'default') {
        css[cssPropertyName] = value;
      } else {
        css[`@media ${queries[size]}`] = {
          [cssPropertyName]: value,
        };
      }
    }

    return css;
  }
};

const GridWrapper = styled('div')`
  display: grid;
  justify-items: ${(props) => props.$justify};
  align-content: ${(props) => props.$align};

  /* for some reason the order of these matter */
  /* columns must be set first to fix a bug with the order of the media queries */
  ${(props) => responsiveProps(props.$columns, 'grid-template-columns')}
  ${(props) => responsiveProps(props.$areas, 'grid-template-areas')}
  ${(props) => responsiveProps(props.$gap, 'gap')}
`;

const Grid = ({
  as,
  align = 'stretch',
  maxWidth,
  gap,
  areas,
  columns,
  children,
  className,
  justify = 'center',
  style,
}) => (
  <Stack as={as} maxWidth={maxWidth} style={{ ...style }}>
    <GridWrapper
      className={className}
      $align={align}
      $areas={areas}
      $columns={columns}
      $gap={gap}
      $justify={justify}
    >
      {children}
    </GridWrapper>
  </Stack>
);

export default Grid;
