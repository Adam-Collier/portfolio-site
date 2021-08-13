import { ArrowRight } from 'react-feather';
import s from './listitem.module.css';

const ListItem = ({ children }) => (
  <li className={s.listItem}>
    <ArrowRight size={16} />
    {children}
  </li>
);

export default ListItem;
