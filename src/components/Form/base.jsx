import { styled } from 'goober';
import { mutate } from 'swr';

export const Form = styled('form')`
  > * + * {
    margin-top: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    width: 100%;

    p {
      padding-left: 0.5rem;
    }
  }

  textarea,
  input {
    padding: 0.375rem 0.5rem;
    font-size: 0.875rem;
    border: none;
    width: 100%;
  }

  button {
    margin-top: 1.5rem;
  }
`;

export const handleSubmit = async (event, {
  apiRoute,
  method,
  body,
  pageId
}) => {
  event.preventDefault();
  try {
    let response = await fetch(apiRoute, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    let newData = await response.json();

    mutate(
      apiRoute + pageId,
      // we can access prevData in this function if we need to
      // but tbh we are grabbing all of the new data anyway
      () => {
        return newData;
      },
      // Disable revalidation
      false
    );
  } catch (error) {
    console.error(error);
  }
};
