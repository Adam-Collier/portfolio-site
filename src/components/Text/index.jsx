import { styled } from 'goober';

const TextWrapper = styled('p')`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  font-size: ${(props) => `var(--text-${props.$size})`};
  line-height: ${(props) => (props.$heading ? 1.3 : props.$lineHeight)};
  font-weight: ${(props) => (props.$heading ? 600 : props.$weight)};
  color: ${(props) => (props.$color ? props.$color : 'inherit')};

  ${(props) =>
    props.$truncate &&
    `
    display: -webkit-box;
    -webkit-line-clamp: ${props.$truncate};
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}

  ${(props) =>
    props.$scrollMargin &&
    `
    scroll-margin: ${props.$scrollMargin};
  `}
`;

const Text = ({
  align,
  as = 'p',
  children,
  className,
  color,
  heading = false,
  id,
  lineHeight = 1.75,
  size = 'base',
  style,
  truncate,
  weight = 450,
  scrollMargin,
}) => (
  <TextWrapper
    as={as}
    id={id}
    className={className}
    style={style}
    $align={align}
    $color={color}
    $heading={heading}
    $lineHeight={lineHeight}
    $scrollMargin={scrollMargin}
    $size={size}
    $truncate={truncate}
    $weight={weight}
  >
    {children}
  </TextWrapper>
);

export default Text;
