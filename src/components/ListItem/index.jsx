import { ArrowRight } from 'react-feather';
import Text from '../Text';
import s from './listitem.module.css';

export const BulletedListItem = ({ children }) => (
  <li className={s.listItem}>
    <ArrowRight size={16} className={s.marker} />
    {children}
  </li>
);

export const NumberedListItem = ({ children, index }) => (
  <li className={s.listItem}>
    <div className={s.marker}>
      <Text>{index}.</Text>
    </div>
    {children}
  </li>
);
