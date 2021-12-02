import { BsStars } from 'react-icons/bs';
import { useQueryClient } from 'react-query';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { queryKeys } from '../constants';
import { TopBar, TweetForm, TweetList } from '../shared';

export const Feed = () => {
  const queryClient = useQueryClient();
  const refetchTweets = async () => {
    await queryClient.refetchQueries([queryKeys.tweets], { active: true });
  };

  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));

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
        barClick={refetchTweets}
        justifyContent="space-between"
        padding="0 10px 0 16px"
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Home
        </Typography>
        <IconButton size="small" color="secondary" edge="end">
          <BsStars />
        </IconButton>
      </TopBar>

      {matches && <TweetForm fileInputId="feed-file-input" />}

      <TweetList />
    </Stack>
  );
};
