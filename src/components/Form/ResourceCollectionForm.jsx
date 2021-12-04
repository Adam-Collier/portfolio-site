import { useState } from 'react';
import { Form, handleSubmit } from './base';
import Stack from '../Stack';
import Text from '../Text';
import Button from '../Button';

const ResourceFormCollection = ({ pageId, itemId, apiRoute, name, description, excerpt, edit }) => {
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
      onSubmit={(e) =>
        handleSubmit(e, {
          apiRoute,
          method: edit ? 'PUT' : 'POST',
          body: {...state, itemId},
          pageId
        })
      }
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
          <textarea
            type="text"
            name="description"
            onChange={handleChange}
            value={state.description}
            required
          />
        </label>
        <label>
          <Text size="sm">Excerpt</Text>
          <textarea
            type="text"
            name="excerpt"
            onChange={handleChange}
            value={state.excerpt}
            required
          />
        </label>
      </Stack>
      <Button
        text={edit ? 'Save Changes' : 'Create Resource'}
        variation="secondary"
      />
    </Form>
  );
};

export default ResourceFormCollection;
