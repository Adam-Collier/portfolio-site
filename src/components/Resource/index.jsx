import { styled } from 'goober';
import Text from '../Text';

const Wrapper = styled('div')`
  --columns: 200px 1fr;
  --gap: 1.25rem;
  display: grid;
  grid-template-columns: var(--columns);
  grid-gap: var(--gap);
  position: relative;

  div p + p {
    margin-top: 0.125rem;
    color: var(--foreground-high);
    font-size: 0.875rem;
  }

  @media (max-width: 767px) {
    --columns: 100%;
    --gap: 0;
    grid-template-rows: min-content min-content;
  }
`;

const Resource = ({
  children,
  link,
  title,
  summary,
  description,
}) => {
  return (
    <Wrapper>
      {children}
      <div>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Text>{title}</Text>
        </a>
        <Text size="sm" color="var(--foreground-high)">
          {summary}
        </Text>
      </div>
      <div>{description}</div>
    </Wrapper>
  );
};

export default Resource;
