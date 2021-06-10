import React from 'react';
import Link from 'next/link';

import Text from '../Text';
import Nav from '../Nav';
import Toggle from '../Toggle';
import MenuButton from './MenuButton';

import s from './header.module.css';

const Header = ({ className, isClose }) => (
  <>
    <div className={`${s.wrapper} ${className || ''}`}>
      <header className={s.header}>
        <Link href="/">
          <a
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Text lineHeight={1}>Adam Collier</Text>
          </a>
        </Link>
        <div>
          <Nav className={s.nav} />
          <Toggle className={s.toggle} />
          <MenuButton isClose={isClose} />
        </div>
      </header>
    </div>
  </>
);

export default Header;
