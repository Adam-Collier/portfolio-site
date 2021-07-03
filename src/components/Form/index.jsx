import React, { useState } from 'react';
import Button from '../Button';
import Stack from '../Stack';
import Text from '../Text';
import s from './form.module.css';
import { ErrorAlert, SuccessAlert } from '../Alert';

const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const Form = ({ title, text }) => {
  const [content, setContent] = useState({
    subject: `Feedback sent from: ${title}`,
    email: '',
    handle: '',
    message: '',
    honeypot: '',
    accessKey: process.env.NEXT_PUBLIC_STATICFORM_ACCESS_KEY,
  });

  const [response, setResponse] = useState({
    type: '',
    message: '',
  });

  const handleChange = (e) =>
    setContent({ ...content, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://api.staticforms.xyz/submit', {
        method: 'POST',
        body: JSON.stringify(content),
        headers: { 'Content-Type': 'application/json' },
      });

      const json = await res.json();

      console.log(json);

      if (json.success) {
        setResponse({
          type: 'success',
          message: 'Thanks for the feedback! 👍',
        });

        e.target.reset();

        await delay(5000);

        setResponse({ type: '', message: '' });
      } else {
        setResponse({
          type: 'error',
          message: json.message,
        });
      }
    } catch (error) {
      console.log('An error occurred', error);
      setResponse({
        type: 'error',
        message: 'An error occured',
      });
    }
  };

  return (
    <Stack gap={1.45} style={{ width: 'auto' }} className={s.feedback}>
      <Text>{text}</Text>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.message} htmlFor="message">
          Message
          <textarea
            name="message"
            placeholder="What should I know?"
            onChange={handleChange}
            required
          />
        </label>
        <label className={s.email} htmlFor="email">
          Your Email (optional)
          <input type="email" name="email" onChange={handleChange} />
        </label>
        <label className={s.handle} htmlFor="handle">
          Twitter Handle (optional)
          <input type="text" name="$handle" onChange={handleChange} />
        </label>
        <input type="hidden" name="honeypot" style={{ display: 'none' }} />
        <Button className={s.submit} text="Send Feedback" type="submit" />
      </form>
      {response.type &&
        (response.type === 'success' ? (
          <SuccessAlert text={response.message} />
        ) : (
          <ErrorAlert text={response.message} />
        ))}
    </Stack>
  );
};

export default Form;
