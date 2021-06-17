import css from 'styled-jsx/css';
import Row from '../Row';

const getStackStyles = ({ direction, justify, align, gap }) => css.resolve`
  .stack {
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
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

  const pageClass = page ? 'page' : '';
  const paddingClas = padding ? 'padding' : '';

  return (
    <Row
      as={as}
      maxWidth={maxWidth}
      className={`stack ${direction} ${pageClass} ${paddingClas} ${
        StackStyles.className
      } ${className || ''}`}
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
