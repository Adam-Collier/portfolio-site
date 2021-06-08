import React from 'react';
import Link from 'next/link';

import Navigation from '../Navigation';
import Toggle from '../Toggle';
import { useContext } from '../../context';

import s from './header.module.css';
import MenuIcon from '../../icons/menu.svg';
import CloseIcon from '../../icons/close_icon.svg';

const Header = ({ className, isClose }) => {
  const dispatch = useContext()[1];

  return (
    <>
      <header className={`${s.header} ${className || ''}`}>
        <div className={s.container}>
          <div className={s.headerLeft}>
            <Link href="/">
              <a>Adam Collier</a>
            </Link>
          </div>
          <div className={s.headerRight}>
            <Navigation className={s.navigation} />
            <Toggle className={s.toggle} />
            <button
              type="button"
              className={s.menuButton}
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

export default Header;
