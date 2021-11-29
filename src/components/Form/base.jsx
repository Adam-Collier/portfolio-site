import { styled } from 'goober';

const Form = styled('form')`
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

export default Form;
