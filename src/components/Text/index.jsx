import s from './text.module.css';

const Text = ({
  id,
  as = 'p',
  heading = false,
  children,
  size = 'base',
  lineHeight = 1.75,
  weight = 450,
  align,
  truncate,
  color = 'inherit',
  style,
}) => {
  const DynamicTag = `${as}`;

  return (
    <DynamicTag
      className={`${s.text} ${truncate ? s.truncate : ''}`}
      id={id}
      style={{
        '--font-size': `var(--text-${size})`,
        '--font-weight': heading ? 600 : weight,
        '--line-height': heading ? 1.3 : lineHeight,
        '--text-align': align,
        '--truncate': truncate,
        '--color': `var(--${color})`,
        ...style,
      }}
    >
      {children}
    </DynamicTag>
  );
};

export default Text;
