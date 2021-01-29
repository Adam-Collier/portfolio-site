import React from 'react';
import { Link } from 'gatsby';

import Navigation from '../Navigation';
import Breadcrumb from '../Breadcrumb';
import Toggle from '../Toggle';
import { useContext } from '../../context';

import { useMediaQuery } from '../../hooks/useMediaQuery';

import styles from './header.module.css';
import MenuIcon from '../../icons/menu.svg';
import CloseIcon from '../../icons/close_icon.svg';

const Header = ({ location, className, isClose, onClick }) => {
  const dispatch = useContext()[1];

  return (
    <>
      <header className={`${styles.header} ${className || ''}`}>
        <div className={styles.container}>
          <div className={styles.headerLeft}>
            <Link to="/" onClick={onClick || null}>
              Adam Collier
            </Link>
            {useMediaQuery('(min-width: 768px)') && location && (
              <Breadcrumb location={location} />
            )}
          </div>
          <div className={styles.headerRight}>
            <Navigation className={styles.navigation} />
            <Toggle className={styles.toggle} />
            <button
              type="button"
              className={styles.menuButton}
              onClick={() => dispatch({ type: 'isMobileMenu' })}
              onKeyDown={() => dispatch({ type: 'isMobileMenu' })}
              aria-label="menu button"
            >
              {isClose ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default React.memo(Header);
