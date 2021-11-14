import { format, parseISO } from 'date-fns';
import Stack from '../Stack';
import Text from '../Text';

const PublishedAndUpdated = ({ publishedOn, updatedOn }) => (
  <Stack gap={0.5} direction="row">
    {publishedOn && (
      <Text size="xs">{format(parseISO(publishedOn), 'MMMM dd, yyyy')}</Text>
    )}
    {updatedOn && (
      <Text size="xs" color="var(--foreground-high)">
        (Updated: {format(parseISO(updatedOn), 'MMMM dd, yyyy')})
      </Text>
    )}
  </Stack>
);

export default PublishedAndUpdated;
