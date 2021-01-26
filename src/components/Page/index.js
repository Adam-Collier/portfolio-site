import React from 'react';
import styles from './page.module.css';
import Footer from '../Footer';

const Page = ({ children, containerType, containerClass }) => {
  const containerTypeClass =
    containerType === 'fluid' ? styles.containerFluid : styles.container;

  return (
    <main
      className={`${containerTypeClass} ${styles.sidebarLayout} ${containerClass} `}
    >
      {children}
      <Footer />
    </main>
  );
};

export default Page;
