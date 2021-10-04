import Link from 'next/dist/client/link';
import Stack from '../Stack';
import Text from '../Text';
import PublishedAndUpdated from '../PublishedAndUpdated';

import s from './note.module.css';

const Note = ({ title, updatedOn, publishedOn, url, Icon }) => (
  <Link href={url}>
    <a className={s.note}>
      <Stack
        as="article"
        direction="row"
        align="center"
        gap={0.5}
        aria-label={title}
      >
        <div className={s.icon}>
          <Icon size={14} />
        </div>
        <Stack direction="column" gap={0.25}>
          <PublishedAndUpdated
            updatedOn={updatedOn}
            publishedOn={publishedOn}
          />
          <Text as="h3" size="md" heading>
            {title}
          </Text>
        </Stack>
      </Stack>
    </a>
  </Link>
);

export default Note;
