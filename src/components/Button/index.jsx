/* eslint-disable react/button-has-type */
import React from 'react';
import Link from 'next/link';
import { styled } from 'goober';
import { LoadingSpinner } from '../LoadingSpinner';

const StyledButton = styled('button')`
  color: var(--primary-foreground);
  border: none;
  border-radius: 4px;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-sm);
  cursor: pointer;
  position: relative;

  /* if there are more than one child elements add some spacing */
  > * + * {
    margin-left: 0.5rem;
  }

  /* change the width depending on the layout prop */
  ${(props) =>
    props.$fill &&
    `
      width: 100%;
    `}

  ${(props) =>
    props.$variant === 'primary' &&
    `
    border: 1px solid var(--primary-foreground);
    background: var(--primary-foreground);
    color: var(--primary-background);

    &:hover {
      background: var(--foreground-max);
    }
  `}

  ${(props) =>
    props.$variant === 'secondary' &&
    `
    border: 1px solid var(--foreground-high);

    &:hover {
      background: var(--foreground-low);
    }
  `}

  ${props => props.$loading && `
    >:not(svg) {
      visibility: hidden;
    }
  `}
`;

const Spinner = styled(LoadingSpinner)`
  position: absolute;
`

const Button = ({
  link,
  onClick,
  onKeyPress,
  children,
  variant = 'primary',
  fill,
  loading
}) => {
  // pass these to the styled component easily and add more if we need to
  const rest = { $variant: variant, $fill: fill };
  // if an internal links render the Next Link component
  if (link && link.startsWith('/')) {
    return (
      <Link href={link} passHref>
        <StyledButton as="a" {...rest}>
          {children}
        </StyledButton>
      </Link>
    );
  }

  if (link) {
    return (
      <StyledButton as="a" href={link} {...rest}>
        {children}
      </StyledButton>
    );
  }

  return (
    <StyledButton
      onClick={onClick}
      onKeyPress={onKeyPress}
      $loading={loading}
      {...rest}
    >
      <p>{children}</p>
      {loading && <Spinner />}
    </StyledButton>
  );
};

export default Button;
