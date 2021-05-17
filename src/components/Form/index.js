import React from 'react';
import styles from './form.module.css';
import Button from '../Button';

const Form = ({ title }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    fetch('https://kwes.io/api/foreign/forms/3xfCu8GGFz1QusZWJUph', {
      method: 'POST',
      body: new FormData(form),
      headers: {
        Accept: 'application/json',
      },
    }).then((response) => {
      console.log(response);
    });
  };

  return (
    <div className={styles.feedback}>
      <p>
        Please let me know if anything I wrote was confusing, incorrect or
        outdated. Write a few words below and I will be sure to amend the
        content with your suggestions.
      </p>
      <form
        action="https://kwes.io/api/foreign/forms/3xfCu8GGFz1QusZWJUph"
        onSubmit={handleSubmit}
        className={`kwes-form ${styles.form}`}
      >
        <input
          type="hidden"
          value={`New comment on: ${title}`}
          name="subject"
          readOnly
        />
        <label htmlFor="message" className={styles.message}>
          Message
          <textarea name="message" placeholder="What should I know?" />
        </label>
        <label htmlFor="email" className={styles.email}>
          Your Email (optional)
          <input type="text" name="email" rules="required|max:255" />
        </label>
        <label htmlFor="handle" className={styles.handle}>
          Twitter Handle (optional)
          <input type="text" name="handle" rules="required|max:255" />
        </label>
        <Button type="submit" className={styles.submit} text="Send Feedback" />
      </form>
    </div>
  );
};
export default Form;
