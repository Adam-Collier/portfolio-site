import { Fragment } from 'react';
import Stack from '../Stack';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import s from './sidebar.module.css';

const Sidebar = ({ children, top }) => {
  const Component = useMediaQuery('(max-width: 767px)') ? Fragment : Stack;

  return (
    <Component
      as="aside"
      gap={1.45}
      className={s.sidebar}
      style={{ '--top': top ? `${top}vh` : `6rem` }}
    >
      {children}
    </Component>
  );
};

export default Sidebar;
