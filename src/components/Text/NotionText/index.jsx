import Text from '../index';
import { toSlug } from '../../../utils/to-slug';

const NotionText = ({ text, as = 'p', heading, size }) => {
  if (!text) {
    return null;
  }

  return (
    <Text
      id={heading ? toSlug(text[0][0]) : ''}
      as={as}
      heading={heading}
      size={size}
      style={heading ? { scrollMargin: '80px' } : {}}
    >
      {text.map(([content, decorations], i) => {
        if (!decorations) {
          return content;
        }

        return decorations.reduceRight((element, decorator) => {
          switch (decorator[0]) {
            case 'h':
              return <span key={i}>{element}</span>;
            case 'c':
              return <code key={i}>{element}</code>;
            case 'b':
              return <b key={i}>{element}</b>;
            case 'i':
              return <em key={i}>{element}</em>;
            case 's':
              return <s key={i}>{element}</s>;
            case 'a':
              return (
                <a href={decorator[1]} key={i}>
                  {element}
                </a>
              );

            default:
              return <Text key={i}>{element}</Text>;
          }
        }, <>{content}</>);
      })}
    </Text>
  );
};

export default NotionText;
