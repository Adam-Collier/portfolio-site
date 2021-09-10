import { Info } from 'react-feather';
import Text from '../Text';
import Stack from '../Stack';
import s from './callout.module.css';

const Callout = ({ text }) => (
  <Stack direction="row" gap={0.5} className={s.callout}>
    <div className={s.icon}>
      <Info size={24} />
    </div>
    <Text>{text}</Text>
  </Stack>
);

export default Callout;
