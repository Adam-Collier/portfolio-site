import { useState } from 'react';
import { Form } from './base';
import Text from '../Text';
import TextArea from '../TextArea';
import { toSlug } from '../../utils/to-slug';

const SnippetFormCollection = ({
  pageId,
  itemId,
  name,
  description,
  edit,
}) => {
  const [state, setState] = useState({
    name: name || '',
    description: description || '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <Form
      config={{
        apiRoute: "/api/snippets/collection",
        method: edit ? 'PUT' : 'POST',
        body: { ...state, itemId },
        pageId,
        redirect: `/snippets/${state.name}`
      }}
      buttonText={edit ? 'Save Changes' : 'Create Resource'}
    >
      <label>
        <Text size="sm">Name</Text>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={state.name}
          required
        />
      </label>
      <label>
        <Text size="sm">Description</Text>
        <TextArea
          name="description"
          value={state.description}
          handleChange={handleChange}
          maxChar={250}
          rows={4}
          required
        />
      </label>
    </Form>
  );
};

export default SnippetFormCollection;
