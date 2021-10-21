import { BsArrowLeft } from 'react-icons/bs';
import { Link, useHistory, useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTweetById } from './hooks/useTweetById';
import { TopBar, TweetImages } from '../shared';
import { dateFull } from '../utils/date';

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
      <Stack px={2} component="article">
        <Stack direction="row" spacing={1.5} my={2}>
          <Avatar src={tweet.user.avatar.url} alt={`${tweet.user.name}`} />
          <Stack
            alignItems="flex-start"
            sx={{
              '& a': {
                textDecoration: 'none',
                fontWeight: 700,
              },
              '&:hover': {
                '& a': {
                  textDecoration: 'underline',
                },
              },
            }}
          >
            <Typography
              color="text.primary"
              to={`/${tweet.user.username}`}
              component={Link}
            >
              {tweet.user.name}
            </Typography>
            <Typography color="text.secondary">{`@${tweet.user.username}`}</Typography>
          </Stack>
        </Stack>

        <Typography fontSize="1.4rem" lineHeight={1.3}>
          {tweet.content}
        </Typography>

        {tweet?.images.length === 1 ? (
          <Stack my={2} sx={{ borderRadius: '16px', overflow: 'hidden' }}>
            <img src={tweet.images[0].url} alt="Image" />
          </Stack>
        ) : (
          <TweetImages images={tweet.images} />
        )}

        <Typography
          color="text.secondary"
          sx={{
            '&:hover': {
              textDecoration: 'underline',
              cursor: 'pointer',
            },
          }}
        >
          {dateFull(tweet.createdAt)}
        </Typography>
      </Stack>
    </Stack>
  );
};
