import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Text from '../Text';
import s from './nav.module.css';

const NavLink = ({ children, href, size, activeClass }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a className={`${router.asPath === href ? activeClass : ''}`}>
        <Text lineHeight={1} size={size} heading>
          {children}
        </Text>
      </a>
    </Link>
  );
};

const Nav = ({ className, size, activeClass }) => (
  // s.nav here is the base styles which we can build on top of
  <ul className={`${s.nav} ${className || ''}`}>
    <li>
      <NavLink href="/blog" size={size} activeClass={activeClass}>
        Blog
      </NavLink>
    </li>
    <li>
      <NavLink href="/snippets" size={size} activeClass={activeClass}>
        Snippets
      </NavLink>
    </li>
    <li>
      <NavLink href="/resources" size={size} activeClass={activeClass}>
        Resources
      </NavLink>
    </li>
  </ul>
);

export default Nav;
