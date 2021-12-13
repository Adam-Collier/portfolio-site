import React from 'react';
import Link from 'next/link';

import Text from '../Text';
import Stack from '../Stack';
import Nav from '../Nav';
import Toggle from '../Toggle';
import MenuButton from './MenuButton';
import Button from '../Button';

import s from './header.module.css';
import useSession from '../../lib/useSession';

const Header = ({ className, isClose }) => {
  const { admin, mutateAdmin } = useSession();

  return (
    <>
      <div className={`${s.wrapper} ${className || ''}`}>
        <Stack as="header" direction="row" maxWidth="xl" className={s.header}>
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
            {admin?.isLoggedIn && (
              <Button
                onClick={async (e) => {
                  e.preventDefault();
                  mutateAdmin(
                    await fetch('/api/logout', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                    }),
                    false
                  );
                }}
                variant="secondary"
              >
                Sign Out
                </Button>
            )}
            <MenuButton isClose={isClose} />
          </div>
        </Stack>
      </div>
    </>
  );
};

export default Header;
