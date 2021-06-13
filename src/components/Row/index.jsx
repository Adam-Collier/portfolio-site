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
      className={`${padding ? 'padding' : ''} ${className || ''}`}
      style={{ ...style }}
    >
      <style jsx>{`
        --width-none: none;
        --width-sm: 640px;
        --width-md: 768px;
        --width-lg: 1024px;
        --width-xl: 1280px;
        --width-2xl: 1536px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        max-width: var(--width-${maxWidth});

        .padding {
          padding-left: 1rem;
          padding-right: 1rem;
          max-width: calc(var(--width-${maxWidth}) + 2rem);
        }
      `}</style>
      {children}
    </DynamicTag>
  );
};

export default Row;
