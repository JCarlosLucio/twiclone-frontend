import { useState } from 'react';
import { BsChat, BsHeart, BsHeartFill, BsUpload } from 'react-icons/bs';
import { AiOutlineRetweet } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { TweetForm } from '../shared';
import { useLikeTweet } from '../shared/hooks/useLikeTweet';
import { prepareForImageList } from '../utils/images';
import { dateFromNow } from '../utils/date';

export const Tweet = ({ tweet }) => {
  const [showTweetForm, setShowTweetForm] = useState(false);
  const { like, isLiked, likesCount, isLoading } = useLikeTweet(
    tweet.id,
    tweet.likes
  );

  const handleLike = (e) => {
    e.preventDefault();
    like();
  };

  const toggleTweetForm = () => {
    setShowTweetForm(!showTweetForm);
  };

  const images = prepareForImageList(tweet.images);

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      spacing={2}
      sx={{ borderTop: '1px solid', borderColor: 'divider', p: 2 }}
    >
      <Avatar src={tweet.user.avatar.url} alt={`${tweet.user.name}`} />

      <Stack sx={{ width: '100%' }}>
        <Stack
          direction="row"
          alignItems="flex-start"
          spacing={0.5}
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
          <Typography color="text.secondary">
            {`@${tweet.user.username}`}
          </Typography>
          <Typography color="text.secondary">·</Typography>
          <Typography color="text.secondary">
            {dateFromNow(tweet.createdAt)}
          </Typography>
        </Stack>

        <Stack spacing={1.5}>
          <Typography>{tweet.content}</Typography>
          {images?.length > 0 && (
            <ImageList
              cols={2}
              variant="quilted"
              gap={2}
              rowHeight={139}
              sx={{ borderRadius: '16px', height: 280 }}
            >
              {images.map(({ url, filename, cols, rows }) => {
                return (
                  <ImageListItem key={filename} cols={cols} rows={rows}>
                    <img src={url} alt="Image" loading="lazy" />
                  </ImageListItem>
                );
              })}
            </ImageList>
          )}

          {/** TODO: Refactor buttons into separate component(s) */}
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{ fontSize: '13px' }}
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                '& button ': { color: 'secondary.main' },
                '&:hover, &:hover button': { color: 'primary.main' },
              }}
            >
              <IconButton
                onClick={toggleTweetForm}
                color="primary"
                size="small"
              >
                <BsChat />
              </IconButton>
              {tweet.replies.length > 0 && tweet.replies.length}
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                '& button ': { color: 'secondary.main' },
                '&:hover, &:hover button': { color: 'success.main' },
              }}
            >
              <IconButton color="success" size="small">
                <AiOutlineRetweet />
              </IconButton>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                color: isLiked ? 'error.main' : 'secondary.main',
                '& button ': {
                  color: isLiked ? 'error.main' : 'secondary.main',
                },
                '&:hover, &:hover button': { color: 'error.main' },
              }}
            >
              <IconButton
                onClick={handleLike}
                disabled={isLoading}
                color={'error'}
                size="small"
              >
                {isLiked ? <BsHeartFill /> : <BsHeart />}
              </IconButton>
              {likesCount > 0 && likesCount}
            </Stack>

            <IconButton
              color="primary"
              size="small"
              sx={{
                color: 'secondary.main',
                '&:hover': { color: 'primary.main' },
              }}
            >
              <BsUpload />
            </IconButton>
          </Stack>
          {showTweetForm && (
            <TweetForm
              tweet={tweet}
              fileInputId={`reply-file-input-${tweet.id}`}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
};
