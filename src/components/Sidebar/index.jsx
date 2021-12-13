import React from 'react';
import { styled } from 'goober';
import Stack from '../Stack';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { queries } from '../../config';

const SidebarWrapper = styled(Stack)`
  grid-area: sidebar;
  align-self: flex-start;
  position: sticky;
  top: ${(props) => (props.$top ? `${props.$top}rem` : '6rem')};
  max-height: calc(100vh - 6rem);
  width: 100%;
  overflow-y: scroll;

  @media ${queries.sm} {
    position: relative;
    max-height: revert;
    overflow-y: revert;
    top: revert;
  }
`;

// taken from https://blog.hackages.io/conditionally-wrap-an-element-in-react-a8b9a47fab2
const ConditionalWrapper = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

const Sidebar = ({ children, top }) => {
  const isMobile = useMediaQuery(queries.sm);

  // if the viewport is bigger than mobile
  // render the SidebarWrapper
  return (
    <ConditionalWrapper
      condition={!isMobile}
      wrapper={(c) => (
        <SidebarWrapper gap={1.45} $top={top}>
          {c}
        </SidebarWrapper>
      )}
    >
      {children}
    </ConditionalWrapper>
  );
};

export default Sidebar;
