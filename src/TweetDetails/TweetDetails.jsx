import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { useTweetById } from './hooks/useTweetById';

export const TweetDetails = () => {
  const { tweetId } = useParams();
  const { tweet, isLoading } = useTweetById(tweetId);

  if (isLoading) {
    return <p>Loading...</p>;
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
      <p>{tweet.content}</p>
    </Stack>
  );
};
