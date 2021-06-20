import React from 'react';
import Link from 'next/link';

import Text from '../Text';
import Row from '../Row';
import Nav from '../Nav';
import Toggle from '../Toggle';
import MenuButton from './MenuButton';

import s from './header.module.css';

const Header = ({ className, isClose }) => (
  <>
    <div className={`${s.wrapper} ${className || ''}`}>
      <Row as="header" maxWidth="xl" className={s.header} padding>
        <Link href="/">
          <a
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Text lineHeight={1} heading>
              Adam Collier
            </Text>
          </a>
        </Link>
        <div>
          <Nav className={s.nav} activeClass={s.active} />
          <Toggle className={s.toggle} />
          <MenuButton isClose={isClose} />
        </div>
      </Row>
    </div>
  </>
);

export default Header;
