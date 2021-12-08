import { styled } from 'goober';
import { useState } from 'react';
import Text from '../Text';

const Wrapper = styled('div')`
  position: relative;

  textarea {
    resize: none;
  }
`;

const CharacterCount = styled(Text)`
  position: absolute;
  bottom: 0.25rem;
  right: 0.25rem;

  &.error {
    color: var(--primary-error);
  }
`;

const TextArea = ({
  // needed for the textarea to function
  handleChange,
  required,
  name,
  value,
  // UI only
  maxChar = 250,
  rows = 5,
}) => {
  const [characterCount, setCharacterCount] = useState(0);

  return (
    <Wrapper>
      <textarea
        name={name}
        cols="30"
        rows={rows}
        onChange={(e) => {
          handleChange(e);
          setCharacterCount(e.target.value.length);
        }}
        required={required}
        value={value}
      />
      <CharacterCount
        size="xs"
        className={characterCount > maxChar ? 'error' : ''}
      >
        {characterCount}/{maxChar}
      </CharacterCount>
    </Wrapper>
  );
};

export default TextArea;
