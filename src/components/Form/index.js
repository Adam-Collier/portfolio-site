import React, { useState } from 'react';
import Button from '../Button';
import styles from './form.module.css';
import { ErrorAlert, SuccessAlert } from '../Alert';

const delay = (duration) =>
  new Promise((resolve) => setTimeout(resolve, duration));

const Form = ({ title }) => {
  const [content, setContent] = useState({
    subject: `Feedback sent from: ${title}`,
    email: '',
    handle: '',
    message: '',
    honeypot: '',
    accessKey: 'ed0981a9-287b-4631-9367-39d40c874490',
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
    <div className={styles.feedback}>
      <p>
        Please let me know if you found anything I wrote confusing, incorrect or
        outdated. Write a few words below and I will make any amends you
        suggest.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.message} htmlFor="message">
          Message
          <textarea
            name="message"
            placeholder="What should I know?"
            onChange={handleChange}
            required
          />
        </label>
        <label className={styles.email} htmlFor="email">
          Your Email (optional)
          <input type="email" name="email" onChange={handleChange} />
        </label>
        <label className={styles.handle} htmlFor="handle">
          Twitter Handle (optional)
          <input type="text" name="$handle" onChange={handleChange} />
        </label>
        <input type="hidden" name="honeypot" style={{ display: 'none' }} />
        <Button className={styles.submit} text="Send Feedback" type="submit" />
      </form>
      {response.type &&
        (response.type === 'success' ? (
          <SuccessAlert text={response.message} />
        ) : (
          <ErrorAlert text={response.message} />
        ))}
    </div>
  );
};

export default Form;
