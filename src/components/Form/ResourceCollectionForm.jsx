import { useState } from 'react';
import { Form, handleSubmit } from './base';
import Stack from '../Stack';
import Text from '../Text';
import TextArea from '../TextArea';
import Button from '../Button';

const ResourceFormCollection = ({
  pageId,
  itemId,
  apiRoute,
  name,
  description,
  excerpt,
  edit,
}) => {
  const [state, setState] = useState({
    name: name || '',
    description: description || '',
    excerpt: excerpt || '',
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
        apiRoute,
        method: edit ? 'PUT' : 'POST',
        body: { ...state, itemId },
        pageId,
      }}
      buttonText={edit ? 'Save Changes' : 'Create Resource'}
    >
      <Stack gap={0.5}>
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
        <label>
          <Text size="sm">Excerpt</Text>
          <TextArea
            name="excerpt"
            value={state.excerpt}
            handleChange={handleChange}
            maxChar={200}
            rows={2}
            required
          />
        </label>
      </Stack>
    </Form>
  );
};

export default ResourceFormCollection;
