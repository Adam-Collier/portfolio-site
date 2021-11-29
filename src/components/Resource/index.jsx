import { styled } from 'goober';
import Text from '../Text';
import Stack from '../Stack';
import { useSession } from 'next-auth/client';
import Dialog from '../Dialog';
import ResourceForm from '../Form/ResourceForm';
import { Edit, Trash } from 'react-feather';

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

const EditToolbar = ({ form, id }) => {
  const Wrapper = styled(Stack)`
    position: absolute;
    top: 0;
    right: -3rem;
    color: var(--foreground-high);
    background: var(--foreground-min);
    border-radius: 3px 30px 30px 30px;
    padding: 0.75rem 0.5rem;

    svg:hover {
      color: var(--primary-foreground);
      cursor: pointer;
    }
  `;

  const handleDelete = async () => {
    await fetch(`/api/resource/${id}`, {
      method: 'DELETE',
    });
  }

  return (
    <Wrapper gap={0.25}>
      <Dialog headerText="Edit a Resource" trigger={<Edit size={14} />}>
        {form}
      </Dialog>
      <Trash size={14} onClick={handleDelete}/>
    </Wrapper>
  );
};

const Resource = ({ id, link, title, summary, description, section }) => {
  const [session] = useSession();

  return (
    <Wrapper>
      {session && (
        <EditToolbar
          form={
            <ResourceForm
              id={id}
              link={link}
              title={title}
              summary={summary}
              description={description}
              section={section}
              edit
            />
          }
          id={id}
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
