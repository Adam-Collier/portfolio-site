import React, { useState, useRef, useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import { useContext } from '../../context';

import Header from '../Header';
import Nav from '../Nav';

import s from './mobilemenu.module.css';

const MobileMenu = ({ isMobileMenu }) => {
  const dispatch = useContext()[1];
  // if we close the menu on the same page we transition it out
  // otherwise we just remove it straight away
  const [transitionOut, setTransitionOut] = useState(true);

  // get a reference to the menu element here
  const menuRef = useRef(null);

  const transitions = useTransition(isMobileMenu, null, {
    from: {
      maxHeight: '0px',
    },
    enter: {
      maxHeight: '500px',
    },
    leave: transitionOut ? { maxHeight: '0px' } : { opacity: 0 },
  });

  // if transitionOut is false make sure to reset it after useTransition has used it
  if (transitionOut === false) setTransitionOut(true);

  // taken from here: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setTransitionOut(false);
        dispatch({ type: 'isMobileMenu' });
      }
    };
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef, dispatch]);

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div className={s.menu} key={key} style={props} ref={menuRef}>
          <>
            <Header className={s.header} isClose />
            {/* pass in custom styles and change the font size */}
            <Nav
              className={s.nav}
              size="lg"
              onClick={() => {
                setTransitionOut(false);
                dispatch({ type: 'isMobileMenu' });
              }}
            />
          </>
        </animated.div>
      )
  );
};

export default MobileMenu;
