import { BsArrowLeft } from 'react-icons/bs';
import { Link, useHistory, useParams } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTweetById } from './hooks/useTweetById';
import { LikeButton, TopBar, TweetImages, UserHeader } from '../shared';
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
      <Stack px={2} component="article" spacing={2}>
        <Stack direction="row" spacing={1.5} mt={2}>
          <Avatar
            src={tweet.user.avatar.url}
            alt={`${tweet.user.name}`}
            component={Link}
            to={`/${tweet.user.username}`}
            onClick={(e) => e.stopPropagation()}
          />
          <UserHeader user={tweet.user} direction="column" withLink />
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

        <Divider />

        {tweet?.likes?.length > 0 && (
          <>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <Typography fontWeight="700">{tweet?.likes?.length}</Typography>
              <Typography variant="body1" color="text.secondary">
                Likes
              </Typography>
            </Stack>
            <Divider />
          </>
        )}

        <LikeButton tweetId={tweet?.id} likes={tweet?.likes} size="medium" />

        <Divider />
      </Stack>
    </Stack>
  );
};
