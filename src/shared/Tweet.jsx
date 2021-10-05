import { useState } from 'react';
import { Link } from 'react-router-dom';
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
    <div style={{ border: '1px solid blue' }}>
      <div>
        <img
          style={{ width: 40 }}
          src={tweet.user.avatar.url}
          alt={`${tweet.user.name} avatar`}
        />
        <Link to={`/${tweet.user.username}`}>
          {tweet.user.name}
          <span>{`@${tweet.user.username}`}</span>
        </Link>
      </div>
      <p>{tweet.content}</p>
      {tweet.images && tweet.images.length > 0 && (
        <img
          style={{ width: '504px' }}
          src={tweet.images[0].url}
          alt="tweet image"
        />
      )}
      <div>
        <button onClick={toggleTweetForm}>Reply</button>
        <button onClick={handleLike} disabled={isLoading}>
          {isLoading ? 'liking...' : isLiked ? 'unlike' : 'like'}
        </button>
        {likesCount}
      </div>
      {showTweetForm && <TweetForm tweet={tweet} />}
    </div>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
};
