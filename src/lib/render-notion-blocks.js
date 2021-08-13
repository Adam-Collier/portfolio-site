/* eslint-disable camelcase */
import Text from '../components/Text';

export const NotionText = ({ text, as = 'p', heading, size }) => {
  if (!text) {
    return null;
  }

  return (
    <Text as={as} heading={heading} size={size}>
      {text.map((value) => {
        const { text: block } = value;
        return block.link ? (
          <a href={block.link.url}>{block.content}</a>
        ) : (
          block.content
        );
      })}
    </Text>
  );
};

export const renderComponents = (block, index) => {
  const { type } = block;
  const blockValues = block[type];
  // grab the content if we can
  // this won't be the case for our grouped content
  // const content = block[type]?.text[0].plain_text;

  switch (type) {
    case 'heading_1':
      return (
        <NotionText
          key={index}
          as="h1"
          size="2xl"
          heading
          text={blockValues.text}
        />
      );

    case 'heading_2':
      return (
        <NotionText
          key={index}
          as="h2"
          size="xl"
          heading
          text={blockValues.text}
        />
      );

    case 'heading_3':
      return (
        <NotionText
          key={index}
          as="h3"
          size="lg"
          heading
          text={blockValues.text}
        />
      );

    case 'paragraph':
      return <NotionText key={index} as="p" text={blockValues.text} />;

    case 'bulleted_list_group':
      return (
        <ul key={index}>
          {block.items.map((item, i) => (
            <li key={i}>{item.bulleted_list_item.text[0].plain_text}</li>
          ))}
        </ul>
      );

    case 'numbered_list_group':
      return (
        <ol key={index}>
          {block.items.map((item, i) => (
            <li key={i}>{item.numbered_list_item.text[0].plain_text}</li>
          ))}
        </ol>
      );

    default:
      console.log(block, 'is not supported');
  }
};
