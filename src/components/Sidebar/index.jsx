import { Fragment } from 'react';
import Stack from '../Stack';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import s from './sidebar.module.css';

const Sidebar = ({ children, top }) => {
  const LAYOUT_OPTIONS = {
    stack: {
      component: Stack,
      props: {
        as: 'aside',
        gap: 1.45,
        className: s.sidebar,
        style: { '--top': top ? `${top}rem` : `6rem` },
      },
    },
    fragment: {
      component: Fragment,
      props: {},
    },
  };

  const layout = useMediaQuery('(max-width: 767px)')
    ? LAYOUT_OPTIONS.fragment
    : LAYOUT_OPTIONS.stack;

  const { component: Layout, props } = layout;

  return <Layout {...props}>{children}</Layout>;
};

export default Sidebar;
