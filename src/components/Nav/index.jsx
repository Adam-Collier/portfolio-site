import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Text from '../Text';
import s from './nav.module.css';

const NavLink = ({ children, onClick, href, size, activeClass }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={`${router.asPath === href ? activeClass : ''}`}
        onClick={onClick}
        onKeyDown={onClick}
        role="button"
        tabIndex={0}
      >
        <Text lineHeight={1} size={size} heading>
          {children}
        </Text>
      </a>
    </Link>
  );
};

const Nav = ({ className, onClick, size, activeClass }) => (
  // s.nav here is the base styles which we can build on top of
  <ul className={`${s.nav} ${className || ''}`}>
    <li>
      <NavLink
        href="/blog"
        size={size}
        activeClass={activeClass}
        onClick={onClick}
      >
        Blog
      </NavLink>
    </li>
    <li>
      <NavLink
        href="/snippets"
        size={size}
        activeClass={activeClass}
        onClick={onClick}
      >
        Snippets
      </NavLink>
    </li>
    <li>
      <NavLink
        href="/resources"
        size={size}
        activeClass={activeClass}
        onClick={onClick}
      >
        Resources
      </NavLink>
    </li>
    <li>
      <NavLink
        href="/notes"
        size={size}
        activeClass={activeClass}
        onClick={onClick}
      >
        Notes
      </NavLink>
    </li>
    <li>
      <NavLink
        href="/inspiration"
        size={size}
        activeClass={activeClass}
        onClick={onClick}
      >
        Inspiration
      </NavLink>
    </li>
  </ul>
);

export default Nav;
