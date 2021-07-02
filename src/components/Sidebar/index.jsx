import Stack from '../Stack';
import s from './sidebar.module.css';

const Sidebar = ({ children }) => (
  <Stack as="aside" gap={1.45} className={s.sidebar}>
    {children}
  </Stack>
);

export default Sidebar;
