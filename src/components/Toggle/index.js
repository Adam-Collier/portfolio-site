import React, { useEffect } from 'react';
import { useContext } from '../../context';
import styles from './toggle.module.css';

const Toggle = ({ className }) => {
  const [{ isDarkMode }, dispatch] = useContext();

  const initialDispatch = useContext()[1];

  useEffect(() => {
    initialDispatch({
      type: 'isDarkMode',
      value: window.localStorage.getItem('isDarkMode'),
    });
  }, [initialDispatch]);

  const handleInput = () => {
    dispatch({
      type: 'isDarkMode',
      value: isDarkMode === 'true' ? 'false' : 'true',
    });
  };

  return (
    <input
      type="checkbox"
      aria-label="dark mode toggle"
      className={`${styles.toggle} ${className || ''}`}
      checked={isDarkMode === 'true'}
      onChange={handleInput}
    />
  );
};

export default Toggle;
