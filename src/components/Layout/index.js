import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from 'gatsby';
import { useHotkeys } from 'react-hotkeys-hook';
import { useContext } from '../../context';

import { useMediaQuery } from '../../hooks/useMediaQuery';
import MobileMenu from '../MobileMenu';

import Header from '../Header';
import Footer from '../Footer';
import styles from './layout.module.css';
import './global.css';
import '../../styles/variables.css';

const Layout = ({
  children,
  wrapperClass,
  containerClass,
  containerType,
  noSidebar,
}) => {
  const [{ isMobileMenu }] = useContext();

  useHotkeys('cmd+h', (e) => {
    e.preventDefault();
    navigate('/');
  });
  useHotkeys('cmd+s', (e) => {
    e.preventDefault();
    navigate('/snippets');
  });
  useHotkeys('cmd+r', (e) => {
    e.preventDefault();
    navigate('/resources');
  });
  useHotkeys('cmd+b', (e) => {
    e.preventDefault();
    navigate('/blog');
  });

  const isPageMobile = useMediaQuery('(max-width: 767px)');

  const containerTypeClass =
    containerType === 'fluid' ? styles.containerFluid : styles.container;

  return (
    <div className={wrapperClass}>
      <Header />
      {isPageMobile && <MobileMenu isMobileMenu={isMobileMenu} />}
      <main
        className={`${containerTypeClass} ${styles.sidebarLayout} ${containerClass} `}
      >
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
