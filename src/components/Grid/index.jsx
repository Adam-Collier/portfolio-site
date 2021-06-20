import React from 'react';
import Row from '../Row';

const Grid = ({
  as,
  maxWidth,
  gap,
  areas,
  columns,
  children,
  padding,
  style,
}) => (
  <Row
    as={as}
    maxWidth={maxWidth}
    style={{ ...style }}
    padding={padding}
    gap={gap}
  >
    <div>
      <style jsx>{`
        --areas: ${areas};
        --columns: ${columns};
        display: grid;
        grid-template-areas: var(--areas);
        grid-template-columns: var(--columns);
        grid-gap: var(--gap);
        @media (max-width: 767px) {
          --columns: 100%;
          --areas: 'sidebar' 'content' 'footer';
        }
      `}</style>
      {children}
    </div>
  </Row>
);

export default Grid;
