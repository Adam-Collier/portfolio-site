import { styled } from 'goober';
import Text from '../Text';
import { useSession } from 'next-auth/client';
import ResourceForm from '../Form/ResourceForm';
import EditToolbar from '../EditToolbar';

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
  collectionId,
  id,
  link,
  title,
  summary,
  description,
  section,
}) => {
  const [session] = useSession();

  return (
    <Wrapper>
      {session && (
        <EditToolbar
          form={
            <ResourceForm
              collectionId={collectionId}
              id={id}
              link={link}
              title={title}
              summary={summary}
              description={description}
              section={section}
              edit
            />
          }
          resourceId={id}
          collectionId={collectionId}
          type="resource"
        />
      )}
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
