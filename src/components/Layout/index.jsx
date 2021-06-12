import React from 'react';
import { useContext } from '../../context';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import MobileMenu from '../MobileMenu';
import Header from '../Header';
import Footer from '../Footer';

const Layout = ({ children }) => {
  const [{ isMobileMenu }] = useContext();

  const isPageMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div>
      <Header />
      {isPageMobile && <MobileMenu isMobileMenu={isMobileMenu} />}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
