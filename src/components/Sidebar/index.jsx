import Stack from '../Stack';
import s from './sidebar.module.css';

const Sidebar = ({ children, top }) => (
  <Stack
    as="aside"
    gap={1.45}
    className={s.sidebar}
    style={{ '--top': top ? `${top}vh` : `6rem` }}
  >
    {children}
  </Stack>
);

export default Sidebar;
