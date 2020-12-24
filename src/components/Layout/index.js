import React from 'react';
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
  location,
}) => {
  const [{ isMobileMenu }] = useContext();

  const isPageMobile = useMediaQuery('(max-width: 767px)');

  const containerTypeClass =
    containerType === 'fluid' ? styles.containerFluid : styles.container;

  return (
    <div className={wrapperClass}>
      <Header location={location} />
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
