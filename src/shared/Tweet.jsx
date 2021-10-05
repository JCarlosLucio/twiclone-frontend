import { useState } from 'react';
import { BsChat, BsHeart, BsHeartFill, BsUpload } from 'react-icons/bs';
import { AiOutlineRetweet } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
import { TweetForm } from '../shared';
import { useLikeTweet } from '../shared/hooks/useLikeTweet';

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

  return (
    <Stack
      direction="row"
      alignItems="flex-start"
      spacing={2}
      sx={{ borderBottom: '1px solid', borderColor: 'divider', p: 2 }}
    >
      <img
        style={{ width: 40 }}
        src={tweet.user.avatar.url}
        alt={`${tweet.user.name} avatar`}
      />

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Stack direction="row" alignItems="flex-start" spacing={1}>
          <Link to={`/${tweet.user.username}`}>{tweet.user.name}</Link>
          <span>{`@${tweet.user.username}`}</span>
        </Stack>

        <p>{tweet.content}</p>

        {tweet.images && tweet.images.length > 0 && (
          <img
            style={{ width: '100%' }}
            src={tweet.images[0].url}
            alt="tweet image"
          />
        )}

        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
        >
          <span>
            <IconButton
              onClick={toggleTweetForm}
              color="secondary"
              size="small"
            >
              <BsChat />
            </IconButton>
            {tweet.replies.length > 0 && tweet.replies.length}
          </span>
          <span>
            <IconButton
              onClick={toggleTweetForm}
              color="secondary"
              size="small"
            >
              <AiOutlineRetweet />
            </IconButton>
          </span>
          <span>
            <IconButton
              onClick={handleLike}
              disabled={isLoading}
              color={isLiked ? 'error' : 'secondary'}
              size="small"
            >
              {isLiked ? <BsHeartFill /> : <BsHeart />}
            </IconButton>
            {likesCount > 0 && likesCount}
          </span>
          <span>
            <IconButton
              onClick={toggleTweetForm}
              color="secondary"
              size="small"
            >
              <BsUpload />
            </IconButton>
          </span>
        </Stack>
        {showTweetForm && <TweetForm tweet={tweet} />}
      </Stack>
    </Stack>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
};
