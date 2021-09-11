import NotionText from '../NotionText';
import s from './formatted-text.module.css';

const FormattedText = ({ properties, index }) => {
  const [title, textWithType, ...description] = properties.title;

  // get the type, all other text in the string is stored in restOfText
  const [resourceType, ...restOfText] = textWithType[0]
    .split(' - ')
    .filter(Boolean);

  // the resource may have more text inc links and other elements so we prepend restOfText
  description.unshift([restOfText]);

  return (
    <div className={s.formattedText} key={index}>
      <div>
        <NotionText as="p" text={[title]} />
        <p>{resourceType}</p>
      </div>
      <NotionText as="p" text={description} />
    </div>
  );
};

export default FormattedText;
