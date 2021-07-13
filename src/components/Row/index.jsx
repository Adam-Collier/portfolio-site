import s from './row.module.css';

const Row = ({
  as = 'div',
  className,
  maxWidth = 'none',
  padding,
  style,
  children,
}) => {
  const DynamicTag = `${as}`;

  return (
    <DynamicTag
      className={`${s.row} ${padding ? s.padding : ''} ${className || ''}`}
      style={{ ...style, '--max-width': `var(--width-${maxWidth})` }}
    >
      {children}
    </DynamicTag>
  );
};

export default Row;
