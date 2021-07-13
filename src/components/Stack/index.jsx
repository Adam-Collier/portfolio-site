import css from 'styled-jsx/css';
import Row from '../Row';

const getStackStyles = ({ direction, justify, align, gap }) => css.resolve`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};

  .row :global(> * + *) {
    margin-left: calc(${gap} * 1rem);
  }

  .column :global(> * + *) {
    margin-top: calc(${gap} * 1rem);
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
}) => {
  const StackStyles = getStackStyles({ direction, justify, align, gap });

  return (
    <Row
      as={as}
      maxWidth={maxWidth}
      className={`${direction} ${StackStyles.className} ${className || ''}`}
      style={{
        ...style,
      }}
      padding={padding}
    >
      {StackStyles.styles}
      {children}
    </Row>
  );
};

export default Stack;
