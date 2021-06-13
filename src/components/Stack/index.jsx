import css from 'styled-jsx/css';
import Row from '../Row';

const getStackStyles = ({ direction, justify, align, gap }) => css.resolve`
  .stack {
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
  }

  .stack :global(> *) {
    margin-top: 0;
    margin-bottom: 0;
  }

  .row :global(> * + *) {
    margin-left: calc(${gap} * 1rem);
  }

  .column :global(> * + *) {
    margin-top: calc(${gap} * 1rem);
  }

  .page {
    padding-top: 68px;
  }

  @media (max-width: 767px) {
    .row :global(> * + *) {
      margin-left: calc(${gap} * 0.75rem);
    }

    .column :global(> * + *) {
      margin-top: calc(${gap} * 0.75rem);
    }
  }
`;

const Stack = ({
  children,
  as = 'div',
  maxWidth = 'none',
  className,
  justify = 'flex-start',
  align = 'stretch',
  direction = 'column',
  gap = 0,
  style,
  padding,
  page,
}) => {
  const StackStyles = getStackStyles({ direction, justify, align, gap });

  return (
    <Row
      as={as}
      maxWidth={maxWidth}
      className={`${direction} ${page ? 'page' : ''} ${
        padding ? 'padding' : ''
      } ${StackStyles.className} stack ${className || ''}`}
      style={{
        ...style,
      }}
    >
      {StackStyles.styles}
      {children}
    </Row>
  );
};

export default Stack;
