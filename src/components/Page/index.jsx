import React from 'react';
import styles from './page.module.css';

const Page = ({ children, containerType, containerClass, noSidebar }) => {
  const containerTypeClass =
    containerType === 'fluid' ? styles.containerFluid : styles.container;

  return (
    <main
      className={`${containerTypeClass} ${
        noSidebar ? '' : styles.sidebarLayout
      } ${containerClass || ''} `}
    >
      {children}
    </main>
  );
};

export default Page;
