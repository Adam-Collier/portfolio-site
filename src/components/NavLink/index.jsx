import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import s from './navlink.module.css';

const NavLink = ({ children, href }) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <a className={`${s.link} ${router.asPath === href ? s.active : ''}`}>
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
