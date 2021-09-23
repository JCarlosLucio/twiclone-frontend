import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { likeTweet } from '../services/tweets';

export const Tweet = ({ tweet }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData('currentUser');
  const [isLiked, setIsLiked] = useState(tweet.likes.includes(user.id));
  const { mutate, isLoading } = useMutation(likeTweet, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('tweets');
      console.log('returnedData', data);
      setIsLiked(!isLiked);
      // probably needs to be made into an optimistic update
    },
  });

  const handleLike = (e) => {
    e.preventDefault();
    mutate(tweet.id);
  };

  return (
    <div style={{ border: '1px solid blue' }}>
      <Link to={`/${tweet.user.username}`}>
        <h3>
          {tweet.user.name}
          <span>{`@${tweet.user.username}`}</span>
        </h3>
      </Link>
      <p>{tweet.content}</p>
      {tweet.images && tweet.images.length > 0 && (
        <img
          style={{ width: '504px' }}
          src={tweet.images[0].url}
          alt="tweet image"
        />
      )}
      <button onClick={handleLike} disabled={isLoading}>
        {isLoading ? 'liking...' : isLiked ? 'unlike' : 'like'}
      </button>
    </div>
  );
};

Tweet.propTypes = {
  tweet: PropTypes.object.isRequired,
};
