import React from 'react';
import { useTransition, animated } from 'react-spring';
import { useContext } from '../../context';

import Header from '../Header';
import Nav from '../Nav';

import s from './mobilemenu.module.css';

const MobileMenu = ({ isMobileMenu }) => {
  const dispatch = useContext()[1];

  const transitions = useTransition(isMobileMenu, null, {
    from: {
      maxHeight: '0px',
    },
    enter: {
      maxHeight: '500px',
    },
    leave: {
      maxHeight: '0px',
    },
  });

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div className={s.menu} key={key} style={props}>
          <>
            <Header
              className={s.header}
              isClose
              onClick={() => dispatch({ type: 'isMobileMenu' })}
            />
            <div className={s.navigation}>
              {/* pass in custom styles and change the font size */}
              <Nav className={s.nav} size="lg" />
            </div>
          </>
        </animated.div>
      )
  );
};

export default MobileMenu;
