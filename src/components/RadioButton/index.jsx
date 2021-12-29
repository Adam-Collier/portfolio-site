import { styled } from 'goober';
import Text from '../Text';

const Wrapper = styled('label')`
  padding: 0.25rem 0.75rem;
  color: var(--foreground-high);
  border: 1px solid var(--foreground-high);
  border-radius: 2.5rem;
  display: inline-block;
  position: relative;
  cursor: pointer;

  ${(props) =>
    props.$checked &&
    `
        color: var(--foreground-min);
        background: var(--primary-foreground);
        border-color: var(--primary-foreground);
    `}

  input {
    visibility: hidden;
    position: absolute;
  }

  span {
    margin-top: 0;
    display: block;
  }

  & + label {
    margin-left: 0.25rem;
  }
`;

const RadioButton = ({ handleChange, name, text, isActive, value, checked }) => (
  <Wrapper $active={isActive} $checked={checked}>
    <input
      type="radio"
      name={name}
      value={value}
      onChange={handleChange}
      checked={checked}
      required
    />
    <Text as="span" size="xs">{text}</Text>
  </Wrapper>
);

export default RadioButton;
