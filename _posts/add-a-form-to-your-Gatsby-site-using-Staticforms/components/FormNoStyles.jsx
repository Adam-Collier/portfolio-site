import React, { useState } from 'react';
import Button from '../../../src/components/Button';

const FormNoStyles = ({ title }) => {
  const [content, setContent] = useState({
    subject: `Feedback sent from: ${title}`,
    email: '',
    handle: '',
    message: '',
    accessKey: 'your-access-key',
  });

  const handleChange = (e) =>
    setContent({ ...content, [e.target.name]: e.target.value });

  return (
    <div>
      <form>
        <label htmlFor="message">
          Message
          <textarea
            name="message"
            placeholder="What should I know?"
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="email">
          Your Email (optional)
          <input type="email" name="email" onChange={handleChange} />
        </label>
        <label htmlFor="handle">
          Twitter Handle (optional)
          <input type="text" name="handle" onChange={handleChange} />
        </label>
        <Button type="submit" text="Send Feedback" />
      </form>
    </div>
  );
};

export default FormNoStyles;
