import React from 'react';
import { styled } from 'goober';
import { queries } from '../../config';

const StackWrapper = styled('div')`
  display: flex;
  flex-direction: ${(props) => props.$direction};
  justify-content: ${(props) => props.$justify};
  align-items: ${(props) => props.$align};

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  ${(props) =>
    props.$direction === 'row' &&
    `
      > * + * {
        margin-left: calc(${props.$gap} * 1rem);

        @media ${queries.sm} {
          margin-left: calc(${props.$gap} * 0.75rem);
        }
      }
  `}

  ${(props) =>
    props.$direction === 'column' &&
    `
      > * + * {
        margin-top: calc(${props.$gap} * 1rem);

        @media ${queries.sm} {
          margin-top: calc(${props.$gap} * 0.75rem);
        }
      }
  `}

  ${(props) =>
    props.$maxWidth &&
    `
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      max-width: var(--width-${props.$maxWidth});
    `}
`;

const Stack = ({
  align = 'stretch',
  as = 'div',
  children,
  className,
  direction = 'column',
  gap,
  justify = 'flex-start',
  maxWidth,
  style,
}) => (
  <StackWrapper
    as={as}
    style={style}
    className={className}
    $align={align}
    $className={className}
    $direction={direction}
    $gap={gap}
    $justify={justify}
    $maxWidth={maxWidth}
  >
    {children}
  </StackWrapper>
);

export default Stack;
