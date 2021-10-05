import { useState } from 'react';
import { Link } from 'react-router-dom';
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
          <button onClick={toggleTweetForm}>Reply</button>
          <button onClick={handleLike} disabled={isLoading}>
            {isLoading ? 'liking...' : isLiked ? 'unlike' : 'like'}
          </button>
          {likesCount}
        </Stack>
        {showTweetForm && <TweetForm tweet={tweet} />}
      </Stack>
    </Stack>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
};
