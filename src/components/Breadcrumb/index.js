import React from 'react';

import styles from './breadcrumb.module.css';

const Breadcrumb = ({ location }) => {
  const locationString = location.split('/')[1];

  const locationName = locationString
    ? locationString.charAt(0).toUpperCase() + locationString.slice(1)
    : 'Home';

  const firstLetter = locationName.slice(0, 1).toUpperCase();

  return (
    <>
      <h4 className={styles.breadcrumbs}>{locationName}</h4>
      <div className={styles.shortcut}>
        <span>&#183;</span>
        <div>
          <h4>⌘{firstLetter}</h4>
        </div>
      </div>
      <div />
    </>
  );
};

export default Breadcrumb;
