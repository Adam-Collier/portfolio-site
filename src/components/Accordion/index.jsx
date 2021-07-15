/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { Plus, Minus } from 'react-feather';
import Text from '../Text';
import s from './accordion.module.css';

const Accordion = ({ children, title, initialState = false }) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const Icon = isOpen ? Minus : Plus;

  return (
    <>
      <button
        className={s.accordion}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon size={12} />
        <Text size="sm" weight={400}>
          {title}
        </Text>
      </button>
      {isOpen && children}
    </>
  );

  //   return (
  //     <details
  //       open={isOpen}
  //       onClick={(e) => {
  //         e.preventDefault();
  //         setIsOpen(!isOpen);
  //       }}
  //     >
  //       <Text as="summary" size="sm" weight={400} color="foreground-high">
  //         {title}
  //       </Text>
  //       {/* use recursion for nested items */}
  //       {children}
  //     </details>
  //   );
};

export default Accordion;
