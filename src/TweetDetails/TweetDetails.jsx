import { BsArrowLeft } from 'react-icons/bs';
import { useHistory, useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTweetById } from './hooks/useTweetById';
import { TopBar } from '../shared';

export const TweetDetails = () => {
  const { tweetId } = useParams();
  const { goBack } = useHistory();
  const { tweet, isLoading } = useTweetById(tweetId);

  if (isLoading) {
    return (
      <Stack direction="row" justifyContent="center" sx={{ padding: '16px' }}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack
      sx={{
        borderRight: '1px solid',
        borderLeft: '1px solid',
        borderColor: 'divider',
        minHeight: '100vh',
      }}
    >
      <TopBar>
        <IconButton
          size="small"
          color="secondary"
          edge="start"
          onClick={goBack}
        >
          <BsArrowLeft fontSize="large" />
        </IconButton>
        <Typography ml={3} variant="h6" fontWeight="700">
          Tweet
        </Typography>
      </TopBar>
      <p>{tweet.content}</p>
    </Stack>
  );
};
