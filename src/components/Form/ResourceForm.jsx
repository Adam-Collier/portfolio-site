import { useState } from 'react';
import Form from "./base";
import Stack from '../Stack';
import Text from '../Text';
import Button from '../Button';

const ResourceForm = ({ id, collectionId, link, title, summary, description, section, edit }) => {
  const [state, setState] = useState({
    collectionId,
    id: id || "",
    link: link || "",
    title: title || "",
    summary: summary || "",
    description: description || "",
    section: section || "",
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/resource', {
        method: edit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state),
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
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
          <textarea
            type="text"
            name="description"
            onChange={handleChange}
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
      <Button text="Create Resource" variation="secondary" />
    </Form>
  );
};

export default ResourceForm;