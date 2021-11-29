import React from 'react';
import { styled } from 'goober';
import Stack from '../Stack';
import { responsiveProps } from '../../lib/responsive-props';

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
