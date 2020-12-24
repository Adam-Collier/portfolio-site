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

  return (
    <div className={wrapperClass}>
      <Header location={location} />
      {isPageMobile && <MobileMenu isMobileMenu={isMobileMenu} />}
      <main
        className={`${
          containerType === 'fluid' ? styles.containerFluid : styles.container
        } ${containerClass}`}
      >
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
