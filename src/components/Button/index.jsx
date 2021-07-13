/* eslint-disable react/button-has-type */
import React from 'react';
import Link from 'next/link';
import Text from '../Text';

import s from './button.module.css';

// for external links we should render an a tag
const ConditionalLink = ({ link, children }) =>
  link.includes('https://') ? (
    <a
      href={link}
      className={s.link}
      target="__blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <Link href={link} className={s.link}>
      <a>{children}</a>
    </Link>
  );

// if there is no link prop we render a button with an onClick handler
const Wrapper = ({ link, children, className, onClick, onKeyPress }) =>
  link ? (
    <ConditionalLink link={link} className={className}>
      {children}
    </ConditionalLink>
  ) : (
    <button className={className} onClick={onClick} onKeyPress={onKeyPress}>
      {children}
    </button>
  );

const Button = ({
  text,
  link,
  Icon = '',
  className = '',
  onClick,
  onKeyPress,
  type = 'primary',
  layout = 'fit',
}) => (
  <Wrapper
    link={link}
    className={`${s.button} ${className} ${s[type]} ${s[layout]}`}
    onClick={onClick}
    onKeyPress={onKeyPress}
  >
    {Icon && <Icon className={s.icon} size={16} />}
    <Text size="sm">{text}</Text>
  </Wrapper>
);

export default Button;
