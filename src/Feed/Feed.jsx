import { BsStars } from 'react-icons/bs';
import { useQueryClient } from 'react-query';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { queryKeys } from '../constants';
import { TweetForm, TweetList } from '../shared';

export const Feed = () => {
  const queryClient = useQueryClient();
  const goHome = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Refetch new Tweets
    await queryClient.refetchQueries([queryKeys.tweets], { active: true });
  };

  return (
    <Stack
      sx={{
        borderRight: '1px solid',
        borderLeft: '1px solid',
        borderColor: 'divider',
      }}
    >
      <AppBar
        component="div"
        position="sticky"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          cursor: 'pointer',
        }}
        onClick={goHome}
      >
        <Toolbar
          disableGutters
          sx={{
            justifyContent: 'space-between',
            padding: '0 10px 0 16px',
            minHeight: '53px !important',
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Home
          </Typography>
          <IconButton size="small" color="secondary" edge="end">
            <BsStars />
          </IconButton>
        </Toolbar>
      </AppBar>
      <TweetForm fileInputId="feed-file-input" />
      <TweetList />
    </Stack>
  );
};
