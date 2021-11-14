// disable camel case here because notion-api-worker identifiers are snake case
/* eslint-disable camelcase */
import dynamic from 'next/dynamic';
import Image from 'next/image';
import NotionText from '../components/Text/NotionText';
import FormattedText from '../components/Text/FormattedText';
import Stack from '../components/Stack';
import Callout from '../components/Callout';
import { BulletedListItem, NumberedListItem } from '../components/ListItem';
import { Track } from '../components/Spotify';

const CodeBlock = dynamic(() => import('../components/CodeBlock'));

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
        return <FormattedText properties={properties} key={index} />;
      }

      return <NotionText key={index} as="p" text={properties.title} />;

    // we need to use parens here to keep the lexical scope
    case 'code': {
      const content = properties.title[0][0];
      const defaultLanguage = 'jsx';
      const editorLanguage = properties.language[0][0].toLowerCase();

      const language =
        editorLanguage === 'plain text' ? defaultLanguage : editorLanguage;

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
            <NumberedListItem key={i} index={i + 1}>
              <NotionText text={item.properties.title} />
            </NumberedListItem>
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
      return value.properties.map((item) => {
        const { link } = item.properties;
        const title = item.properties.title ?? link;
        const { description } = item.properties;
        const cover = item.format?.bookmark_cover;

        let text;

        if (link[0][0].includes('https://open.spotify.com/playlist')) {
          const descriptionText = description[0][0];
          const removeLeadingText = descriptionText
            .replace(/Listen on Spotify:/g, '')
            .replace(/Listen now only on Spotify: /g, '')
            .replace(/Cover: .*/g, '');
          text = removeLeadingText;
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

    case 'callout':
      return <Callout key={index} text={properties.title[0][0]} />;

    case 'image': {
      const image = properties.source[0][0];

      // taken from https://github.com/splitbee/react-notion/blob/master/src/utils.ts#L46-L62
      const url = new URL(
        `https://www.notion.so${
          image.startsWith('/image')
            ? image
            : `/image/${encodeURIComponent(image)}`
        }`
      );

      if (block && !image.includes('/images/page-cover/')) {
        const table =
          block.value.parent_table === 'space'
            ? 'block'
            : block.value.parent_table;
        url.searchParams.set('table', table);
        url.searchParams.set('id', block.value.id);
        url.searchParams.set('cache', 'v2');
      }

      return (
        <div>
          <Image key={index} src={url.toString()} width={640} height={344} />
        </div>
      );
    }

    default:
      console.log(type, 'is not supported');
  }
};
