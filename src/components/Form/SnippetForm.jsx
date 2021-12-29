import { useState } from 'react';
import { Form } from './base';
import Text from '../Text';
import TextArea from '../TextArea';
import useSWR from 'swr';
import { fetcher } from '../../lib/fetcher';
import RadioButton from '../RadioButton';

const SnippetForm = ({
  // id of the page the form sits on
  pageId,
  // id for editing each resource item
  itemId,
  // what we can pass in to set the default state
  // we use this when editing content
  title,
  content,
  collectionId,
  edit,
}) => {
  const [state, setState] = useState({
    collectionId: collectionId || '',
    title: title || '',
    content: content || '',
  });

  const { data: collections, error } = useSWR(
    '/api/snippets/collections',
    fetcher
  );

  const handleChange = ({ target }) => {
    const { name, value } = target;

    // inputs only give us a string so for the id we need to turn it into a number
    if (name === 'collectionId') {
      value = Number(value);
    }

    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <Form
      config={{
        apiRoute: "/api/snippets",
        method: edit ? 'PUT' : 'POST',
        body: { ...state, itemId },
        pageId,
      }}
      buttonText={edit ? 'Save Changes' : 'Create Snippet'}
    >
        <label>
          <Text size="sm">Title</Text>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            value={state.title}
            required
          />
        </label>
        <label>
          <Text size="sm">Content</Text>
          <TextArea
            name="content"
            handleChange={handleChange}
            value={state.content}
            required
          />
        </label>
        <div>
          <Text size="sm">Category</Text>
          <div>
            {collections &&
              collections.map((collection, index) => {
                return (
                  <RadioButton
                    // giving them the same name means we can select one of a group
                    name="collectionId"
                    // the text the label should have
                    text={collection.name}
                    // we don't use the name for the value we use the id
                    value={collection.id}
                    handleChange={handleChange}
                    key={index}
                    // if the collection id from the api matches the state check the radio
                    checked={collection.id === state.collectionId}
                  />
                );
              })}
          </div>
        </div>
    </Form>
  );
};

export default SnippetForm;
