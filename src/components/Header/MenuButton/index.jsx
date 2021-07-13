import MenuIcon from '../../../icons/menu.svg';
import CloseIcon from '../../../icons/close_icon.svg';
import { useContext } from '../../../context';

import s from './menu-button.module.css';

const MenuButton = ({ isClose }) => {
  const dispatch = useContext()[1];

  return (
    <button
      type="button"
      className={s.menuButton}
      onClick={() => dispatch({ type: 'isMobileMenu' })}
      onKeyDown={() => dispatch({ type: 'isMobileMenu' })}
      aria-label="menu button"
    >
      {isClose ? <CloseIcon /> : <MenuIcon />}
    </button>
  );
};

export default MenuButton;
