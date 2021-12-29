import React from 'react';
import Link from 'next/link';
import { styled } from 'goober';
import Stack from '../../Stack';
import Text from '../../Text';
import Accordion from '../../Accordion';
import Button from '../../Button';
import { queries } from '../../../config';

import Dialog from '../../Dialog';
import useSession from '../../../lib/useSession';
import SnippetCollectionForm from '../../Form/SnippetCollectionForm';
import { toSlug } from '../../../utils/to-slug';
import useSWR from 'swr';
import { fetcher } from '../../../lib/fetcher';

const Wrapper = styled(Stack)`
  grid-area: toc;

  > ul {
    list-style-type: none;
    margin-left: 0;

    ul {
      margin-top: 0.25rem;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    a:hover:not(.active) {
      color: var(--foreground-hover);
    }

    li {
      list-style-type: none;
    }

    li + li {
      margin-top: 0.25rem;
      margin-bottom: 0;
    }

    .active {
      text-decoration: revert;
      color: var(--primary-accent);
    }
  }

  @media ${queries.sm} {
    display: none;
  }
`;

// pass in the headings as we cant guarantee it will come from the same source e.g markdown vs a CMS
const Menu = ({ collections }) => {
  const { admin } = useSession();

  const { data } = useSWR("/api/snippets/collection" + "snippet-menu", fetcher, {
    fallbackData: collections,
    revalidateOnMount: false,
    revalidateOnFocus: false,
  });

  const headings = data.map((item) => {
    const items = item.snippets.map((snippet) => ({
      id: toSlug(snippet.title),
      title: snippet.title,
      items: [],
    }));

    return {
      id: toSlug(item.name),
      title: item.name,
      items,
    };
  });

  return (
    <Wrapper gap={1.45}>
      <Text size="md" heading>
        Snippets Menu
      </Text>
      <ul>
        {headings.map(({ id, title, items }, key) => (
          <li key={key}>
            <Accordion title={title}>
              <ul>
                {items &&
                  items.map((item, key) => (
                    <Text
                      as="li"
                      key={key}
                      size="sm"
                      weight={400}
                      color="var(--foreground-high)"
                    >
                      <Link href={`/snippets/${id}#${item.id}`}>
                        <a>{item.title}</a>
                      </Link>
                    </Text>
                  ))}
              </ul>
            </Accordion>
          </li>
        ))}
      </ul>
      {admin?.isLoggedIn && (
        <Dialog
          headerText="Add a Snippet"
          trigger={<Button variant="secondary">Add a Collection</Button>}
        >
          <SnippetCollectionForm pageId={'snippet-menu'} />
        </Dialog>
      )}
    </Wrapper>
  );
};

export default Menu;
