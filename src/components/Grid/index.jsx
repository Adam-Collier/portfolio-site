import React from 'react';
import Row from '../Row';

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
  <Row as={as} maxWidth={maxWidth} style={{ ...style }} padding={padding}>
    <div>
      <style jsx>{`
        --areas: ${areas?.lg};
        --columns: ${columns};
        --gap: ${gap}rem;

        display: grid;
        grid-template-areas: var(--areas);
        grid-template-columns: var(--columns);
        grid-gap: var(--gap);
        @media (max-width: 767px) {
          --areas: ${areas?.sm};
          --columns: 100%;
          --gap: 1.45rem;
        }
      `}</style>
      {children}
    </div>
  </Row>
);

export default Grid;
