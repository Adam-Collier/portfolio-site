/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState, useEffect } from 'react';
import { Plus, Minus } from 'react-feather';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import Text from '../Text';
import s from './accordion.module.css';

const accordionAtom = atomWithStorage(`accordion`, {});

const Accordion = ({ children, title }) => {
  const [allAccordians, setAllAccordions] = useAtom(accordionAtom);
  const [sectionIsOpen, setSectionIsOpen] = useState(false);

  useEffect(() => {
    setSectionIsOpen(allAccordians[title] || false);
  }, [allAccordians, title]);

  const Icon = sectionIsOpen ? Minus : Plus;

  return (
    <>
      <button
        className={s.accordion}
        type="button"
        onClick={() =>
          setAllAccordions({ ...allAccordians, [title]: !allAccordians[title] })
        }
      >
        <Icon size={12} />
        <Text size="sm" weight={400}>
          {title}
        </Text>
      </button>
      {sectionIsOpen && children}
    </>
  );
};

export default Accordion;
