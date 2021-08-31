// disable camel case here because notion-api-worker identifiers are snake case
/* eslint-disable camelcase */
import Text from '../components/Text';
import Stack from '../components/Stack';
import CodeBlock from '../components/CodeBlock';
import { BulletedListItem, NumberedListItem } from '../components/ListItem';
import { Track } from '../components/Spotify';
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

export const renderBlocks = (block, index) => {
  const { value } = block;
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
          <div className="resource" key={index}>
            <div>
              <NotionText as="p" text={[title]} />
              <p>{resourceType}</p>
            </div>
            <NotionText as="p" text={description} />
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
            <BulletedListItem key={i}>
              <NotionText text={item.properties.title} />
            </BulletedListItem>
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

    case 'collection_view': {
      if (!value) return null;

      const collectionView = block?.collection?.types[0];

      return (
        <Stack gap={1.45} key={index}>
          <NotionText
            as="h2"
            size="xl"
            text={block.collection?.title}
            heading
          />
          {collectionView?.type === 'table' && (
            <table>
              <thead>
                <tr>
                  {collectionView.format?.table_properties
                    ?.filter((p) => p.visible)
                    .map((gp, i) => (
                      <th key={i}>
                        {block.collection?.schema[gp.property]?.name}
                      </th>
                    ))}
                </tr>
              </thead>

              <tbody>
                {block?.collection?.data.map((row, i) => (
                  <tr key={i}>
                    {collectionView.format?.table_properties
                      ?.filter((p) => p.visible)
                      .map((gp, ind) => (
                        <td key={ind}>
                          <NotionText
                            text={
                              row[block.collection?.schema[gp.property]?.name]
                            }
                          />
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Stack>
      );
    }

    case 'bookmark': {
      const { link } = value.properties;
      const title = value.properties.title ?? link;
      const { description } = value.properties;
      const cover = value.format?.bookmark_cover;

      const [intro, , year, songs] = description[0][0].split(' · ');
      const [, artist] = intro.split('. ');
      const text = `${artist} · ${year} · ${songs.slice(0, -1)}`;

      return <Track url={link} image={cover} artist={text} title={title} />;
    }

    case 'bookmark_group': {
      return value.properties.map((item, i) => {
        const { link } = item.properties;
        const title = item.properties.title ?? link;
        const { description } = item.properties;
        const cover = item.format?.bookmark_cover;

        let text;

        if (link[0][0].includes('https://open.spotify.com/playlist')) {
          const descriptionText = description[0][0].split(': ')[1];
          const withoutCoverText = descriptionText.split('Cover')[0];
          text = withoutCoverText;
        } else {
          const [intro, , year, songs] = description[0][0].split(' · ');
          const [, artist] = intro.split('. ');
          text = `${artist} · ${year} · ${songs.slice(0, -1)}`;
        }

        return (
          <Track
            key={index}
            url={link}
            image={cover}
            artist={text}
            title={title}
          />
        );
      });
    }

    default:
      console.log(type, 'is not supported');
  }
};
