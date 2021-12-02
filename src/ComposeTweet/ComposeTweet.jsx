import Stack from '@mui/material/Stack';
import { TopBar, TweetForm } from '../shared';

export const ComposeTweet = () => {
  return (
    <Stack
      sx={{
        borderRight: '1px solid',
        borderLeft: '1px solid',
        borderColor: 'divider',
        minHeight: '100vh',
      }}
    >
      <TopBar
        withBackButton
        justifyContent="space-between"
        padding="0 10px 0 16px"
      />
      <TweetForm fileInputId="compose-tweet-file-input" />
    </Stack>
  );
};
