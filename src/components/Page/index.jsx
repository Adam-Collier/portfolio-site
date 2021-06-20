import React from 'react';
import s from './page.module.css';
import Stack from '../Stack';
import Grid from '../Grid';

const Page = ({
  children,
  layout = 'stack',
  gap = 1.45,
  padding,
  paddingTop = 4.25,
}) => {
  const LAYOUT_OPTIONS = {
    grid: {
      component: Grid,
      props: {
        maxWidth: 'lg',
        areas: "'sidebar content' 'sidebar footer'",
        columns: '320px minmax(0, 1fr)',
      },
    },
    stack: {
      component: Stack,
      props: {
        gap,
        maxWidth: 'sm',
        padding,
      },
    },
  };

  const { component: Layout, props } = LAYOUT_OPTIONS[layout];

  return (
    <Layout
      {...props}
      className={s.page}
      style={{ paddingTop: `${paddingTop}rem` }}
    >
      {children}
    </Layout>
  );
};

export default Page;
