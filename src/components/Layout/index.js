import React from 'react';
import { useContext } from '../../context';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import MobileMenu from '../MobileMenu';

import Header from '../Header';
import '../../styles/global.css';
import '../../styles/variables.css';

const Layout = ({ children, location }) => {
  const [{ isMobileMenu }] = useContext();

  const isPageMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className="page-wrapper">
      <Header location={location} />
      {isPageMobile && <MobileMenu isMobileMenu={isMobileMenu} />}
      {children}
    </div>
  );
};

export default Layout;
