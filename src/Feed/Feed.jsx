import Stack from '@mui/material/Stack';
import { TweetForm, TweetList } from '../shared';

export const Feed = () => {
  return (
    <Stack
      sx={{
        borderRight: '1px solid',
        borderLeft: '1px solid',
        borderColor: 'divider',
      }}
    >
      <TweetForm />
      <TweetList />
    </Stack>
  );
};
