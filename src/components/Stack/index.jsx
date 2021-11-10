import React from 'react';
import styled, { css } from 'styled-components';

const StackElement = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};

  > * {
    margin-top: 0;
    margin-bottom: 0;
  }

  ${(props) =>
    props.direction === 'column' &&
    css`
      > * + * {
        margin-top: calc(${props.gap} * 1rem);

        @media (max-width: 767px) {
          margin-top: calc(${props.gap} * 0.75rem);
        }
      }
    `}

  ${(props) =>
    props.direction === 'row' &&
    css`
      > * + * {
        margin-left: calc(${props.gap} * 1rem);

        @media (max-width: 767px) {
          margin-left: calc(${props.gap} * 0.75rem);
        }
      }
    `}

    ${(props) =>
    props.maxWidth &&
    css`
      --width-sm: 640px;
      --width-md: 768px;
      --width-lg: 1024px;
      --width-xl: 1280px;
      --width-2xl: 1536px;

      width: 100%;
      margin-left: auto;
      margin-right: auto;
      max-width: var(--width-${props.maxWidth});
    `}

    ${(props) =>
    props.padding &&
    css`
      padding-left: ${props.padding}rem;
      padding-right: ${props.padding}rem;
    `}
`;

const Stack = ({
  align = 'stretch',
  as = 'div',
  children,
  className,
  direction = 'column',
  gap = 0,
  justify = 'flex-start',
  maxWidth,
  padding,
  style,
}) => (
  <StackElement
    align={align}
    as={as}
    className={className}
    direction={direction}
    gap={gap}
    justify={justify}
    padding={padding}
    maxWidth={maxWidth}
    style={{ ...style }}
  >
    {children}
  </StackElement>
);

export default Stack;
