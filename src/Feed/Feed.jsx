import { BsStars } from 'react-icons/bs';
import { useQueryClient } from 'react-query';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
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
      <Stack
        direction="row"
        alignItems="flex-center"
        justifyContent="space-between"
        sx={{
          top: '-0.5px',
          position: 'sticky',
          padding: '9px 5px 4px 16px',
          borderBottom: '1px solid',
          borderColor: 'divider',
          zIndex: 3,
          backgroundColor: 'background.paper',
          cursor: 'pointer',
        }}
        onClick={goHome}
      >
        <Typography variant="h6" sx={{ fontWeight: 900 }}>
          Home
        </Typography>
        <IconButton size="small" color="secondary">
          <BsStars />
        </IconButton>
      </Stack>
      <TweetForm />
      <TweetList />
    </Stack>
  );
};
