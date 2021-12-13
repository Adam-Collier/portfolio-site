import { useState } from 'react';
import { Form, handleSubmit } from './base';
import Stack from '../Stack';
import Text from '../Text';
import TextArea from '../TextArea';
import Button from '../Button';
import { LoadingSpinner } from '../LoadingSpinner';

const ResourceForm = ({
  // id of the page the form sits on
  pageId,
  // id for the resource collection
  collectionId,
  // id for editing each resource item
  itemId,
  // what we can pass in to set the default state
  // we use this when editing content
  link,
  title,
  summary,
  description,
  section,
  edit,
}) => {
  const [state, setState] = useState({
    link: link || '',
    title: title || '',
    summary: summary || '',
    description: description || '',
    section: section || '',
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
        apiRoute: '/api/resource',
        method: edit ? 'PUT' : 'POST',
        body: { ...state, itemId, collectionId },
        pageId,
      }}
      buttonText={edit ? 'Save Changes' : 'Create Resource'}
    >
      <Stack gap={0.5}>
        <label>
          <Text size="sm">Link</Text>
          <input
            type="text"
            name="link"
            onChange={handleChange}
            value={state.link}
            required
          />
        </label>
        <Stack direction="row" gap={0.5}>
          <label style={{ width: 'calc(50% - 0.25rem)' }}>
            <Text size="sm">Title</Text>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={state.title}
              required
            />
          </label>
          <label style={{ width: 'calc(50% - 0.25rem)' }}>
            <Text size="sm">Summary</Text>
            <input
              type="text"
              name="summary"
              onChange={handleChange}
              value={state.summary}
              required
            />
          </label>
        </Stack>
        <label>
          <Text size="sm">Description</Text>
          <TextArea
            name="description"
            handleChange={handleChange}
            value={state.description}
            required
          />
        </label>
        <label>
          <Text size="sm">Section</Text>
          <input
            type="text"
            name="section"
            onChange={handleChange}
            value={state.section}
            required
          />
        </label>
      </Stack>
    </Form>
  );
};

export default ResourceForm;
