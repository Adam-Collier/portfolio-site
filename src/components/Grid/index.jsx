import React from 'react';
import styled from 'styled-components';
import Stack from '../Stack';

const GridWrapper = styled.div`
  --areas: ${(props) => props.areas.lg};
  --columns: ${(props) => props.columns};
  --gap: ${(props) => props.gap}

  display: grid;
  grid-template-areas: var(--areas);
  grid-template-columns: var(--columns);
  grid-gap: var(--gap);

  @media (max-width: 768px) {
    --areas: ${(props) => props.areas.sm}
    --columns: 100%;
    --gap: 1.45rem;
  }
`;

const Grid = ({
  as,
  maxWidth,
  gap = 0,
  areas = {
    lg: '',
    sm: '',
  },
  columns,
  children,
  padding,
  style,
}) => (
  <Stack as={as} maxWidth={maxWidth} style={{ ...style }} padding={padding}>
    <GridWrapper areas={areas} columns={columns} gap={gap}>
      {children}
    </GridWrapper>
  </Stack>
);

export default Grid;
