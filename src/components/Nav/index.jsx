import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Text from '../Text';
import s from './nav.module.css';

const NavLink = ({ children, href, size }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a className={`${router.asPath === href ? s.active : ''}`}>
        <Text lineHeight={1} size={size}>
          {children}
        </Text>
      </a>
    </Link>
  );
};

const Nav = ({ className, size }) => (
  // s.nav here is the base styles which we can build on top of
  <ul className={`${s.nav} ${className || ''}`}>
    <li>
      <NavLink href="/blog" size={size}>
        Blog
      </NavLink>
    </li>
    <li>
      <NavLink href="/snippets" size={size}>
        Snippets
      </NavLink>
    </li>
    <li>
      <NavLink href="/resources" size={size}>
        Resources
      </NavLink>
    </li>
  </ul>
);

export default Nav;
