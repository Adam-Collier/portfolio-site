import { styled } from 'goober';
import Stack from '../Stack';
import Dialog from '../Dialog';
import { mutate } from 'swr';
import { Trash, Edit } from 'react-feather';

const EditToolbar = ({ form, itemId, pageId, apiRoute }) => {
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
    let response = await fetch(`${apiRoute}/${itemId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    let newData = await response.json();

    mutate(
      apiRoute + pageId,
      () => newData,
      // Disable revalidation
      false
    );
  };

  return (
    <Wrapper gap={0.25}>
      <Dialog headerText="Edit a Resource" trigger={<Edit size={14} />}>
        {form}
      </Dialog>
      <Trash size={14} onClick={handleDelete} />
    </Wrapper>
  );
};

export default EditToolbar;