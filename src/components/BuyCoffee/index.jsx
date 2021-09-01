import Button from '../Button';
import Stack from '../Stack';
import Text from '../Text';
import CoffeeIcon from '../../icons/buy_coffee.svg';

const BuyCoffee = () => (
  <Stack gap={1.45} style={{ gridArea: 'coffee' }}>
    <Text>Like the content I'm creating? Show some love and:</Text>
    <Button
      link="https://buymeacoffee.com/adamcollier"
      Icon={CoffeeIcon}
      text="Buy me a Coffee"
      type="secondary"
      layout="fit"
    />
  </Stack>
);

export default BuyCoffee;
