import React, { useEffect } from 'react';
import { useContext } from '../../context';
import styles from './toggle.module.css';

const Toggle = ({ className }) => {
  const [{ colorPreference }, dispatch] = useContext();

  const initialDispatch = useContext()[1];

  useEffect(() => {
    initialDispatch({
      type: 'colorPreference',
      value: window.localStorage.getItem('colorPreference'),
    });
  }, [initialDispatch]);

  const handleInput = () => {
    dispatch({
      type: 'colorPreference',
      value: colorPreference === 'dark' ? 'light' : 'dark',
    });
  };

  return (
    <input
      type="checkbox"
      aria-label="dark mode toggle"
      className={`${styles.toggle} ${className || ''}`}
      checked={colorPreference === 'dark'}
      onChange={handleInput}
      tabIndex="0"
    />
  );
};

export default Toggle;
