import React from 'react';
import { useTransition, animated } from 'react-spring';
import { useContext } from '../../context';

import Navigation from '../Navigation';
import Header from '../Header';

import styles from './mobilemenu.module.css';

const Index = ({ isMobileMenu }) => {
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
        <animated.div className={styles.menu} key={key} style={props}>
          <Header
            className={styles.header}
            isClose
            onClick={() => dispatch({ type: 'isMobileMenu' })}
          />
          <Navigation
            className={styles.navigation}
            onClick={() => dispatch({ type: 'isMobileMenu' })}
          />
        </animated.div>
      )
  );
};

export default Index;
