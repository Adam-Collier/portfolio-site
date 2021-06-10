import s from './text.module.css';

const Text = ({
  as = 'p',
  heading = false,
  children,
  size = 'base',
  lineHeight = 1.75,
  weight = 500,
  align,
  truncate,
  color = 'inherit',
}) => {
  const DynamicTag = `${as}`;

  return (
    <DynamicTag
      className={`${s.text} ${truncate ? s.truncate : ''}`}
      style={{
        '--font-size': `var(--text-${size})`,
        '--font-weight': heading ? 600 : weight,
        '--line-height': heading ? 1.3 : lineHeight,
        '--text-align': align,
        '--truncate': truncate,
        '--color': color,
      }}
    >
      {children}
    </DynamicTag>
  );
};

export default Text;
