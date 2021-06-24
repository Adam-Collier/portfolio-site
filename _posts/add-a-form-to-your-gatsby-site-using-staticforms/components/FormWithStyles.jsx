import React, { useState } from 'react';
import Button from '../../../src/components/Button';
import styles from '../form.module.css';

const FormWithStyles = ({ title }) => {
  const [content, setContent] = useState({
    subject: `Feedback sent from: ${title}`,
    email: '',
    handle: '',
    message: '',
    honeypot: '',
    accessKey: 'your-access-key',
  });

  const handleChange = (e) =>
    setContent({ ...content, [e.target.name]: e.target.value });

  return (
    <div className={styles.feedback}>
      <p>
        Please let me know if you found anything I wrote confusing, incorrect or
        outdated. Write a few words below and I will make sure to amend this
        blog post with your suggestions.
      </p>
      <form className={styles.form}>
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
          <input type="text" name="handle" onChange={handleChange} />
        </label>
        <input type="hidden" name="honeypot" style={{ display: 'none' }} />
        <Button className={styles.submit} type="button" text="Send Feedback" />
      </form>
    </div>
  );
};

export default FormWithStyles;
