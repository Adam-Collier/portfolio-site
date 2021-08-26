import { Divide } from 'react-feather';
import Text from '../components/Text';
import CodeBlock from '../components/CodeBlock';
import ListItem from '../components/ListItem';
import { toSlug } from '../utils/to-slug';

export const NotionText = ({ text, as = 'p', heading, size }) => {
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

export const renderBlocks = (value, index) => {
  const { properties, type } = value;

  switch (type) {
    case 'header':
      return (
        <NotionText
          key={index}
          as="h1"
          size="2xl"
          text={properties.title}
          heading
        />
      );

    case 'sub_header':
      return (
        <NotionText
          key={index}
          as="h2"
          size="xl"
          text={properties.title}
          heading
        />
      );

    case 'sub_sub_header':
      return (
        <NotionText
          key={index}
          as="h3"
          size="lg"
          text={properties.title}
          heading
        />
      );

    case 'text':
      if (!value.properties) {
        return;
      }

      if (properties.title[1] && properties.title[1][0].startsWith(' - ')) {
        const [title, textWithType, ...description] = properties.title;

        // get the type, all other text in the string is stored in restOfText
        const [resourceType, ...restOfText] = textWithType[0]
          .split(' - ')
          .filter(Boolean);

        // the resource may have more text inc links and other elements so we prepend restOfText
        description.unshift([restOfText]);

        return (
          <div className="resource">
            <div>
              <NotionText key={index} as="p" text={[title]} />
              <p>{resourceType}</p>
            </div>
            <NotionText key={index} as="p" text={description} />
          </div>
        );
      }

      return <NotionText key={index} as="p" text={properties.title} />;

    // we need to use parens here to keep the lexical scope
    case 'code': {
      const content = properties.title[0][0];
      const language = properties.language[0][0].toLowerCase();

      return (
        <CodeBlock className={language} key={index}>
          {content}
        </CodeBlock>
      );
    }

    case 'bulleted_list_group':
      return (
        <ul key={index}>
          {properties.map((item, i) => (
            <ListItem key={i}>
              <NotionText text={item.properties.title} />
            </ListItem>
          ))}
        </ul>
      );

    case 'numbered_list_group':
      return (
        <ol key={index}>
          {properties.map((item, i) => (
            <li key={i}>
              <NotionText text={item.properties.title} />
            </li>
          ))}
        </ol>
      );

    default:
      console.log(type, 'is not supported');
  }
};
