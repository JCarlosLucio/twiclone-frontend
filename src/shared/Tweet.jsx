import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import { likeTweet } from '../services/tweets';
import { queryKeys } from '../constants';
import { TweetForm } from '../shared';

export const Tweet = ({ tweet }) => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(queryKeys.me);

  const [isLiked, setIsLiked] = useState(tweet.likes.includes(user.id));
  const [likesCount, setLikesCount] = useState(tweet.likes.length);
  const [showTweetForm, setShowTweetForm] = useState(false);

  const { mutate, isLoading } = useMutation(likeTweet, {
    onSuccess: (data) => {
      const tweets = queryClient.getQueryData(queryKeys.tweets);
      const updatedTweets = {
        ...tweets,
        pages: tweets.pages.map((page) => {
          return {
            ...page,
            tweets: page.tweets.map((t) => (t.id === tweet.id ? data : t)),
          };
        }),
      };

      // updates tweets query in cache, it better than invalidating queries
      // because it doesn't move the TweetList with more tweets that were probably
      // added in the meantime, also saves a call to the server
      queryClient.setQueryData(queryKeys.tweets, updatedTweets);

      // updates tweet state locally so if there were other likes
      // from the moment the tweet was loaded to when the like button was clicked
      // the likesCount doesnt look like the action gave more likes than 1
      setLikesCount((prevVal) => prevVal + (isLiked ? -1 : 1));
      setIsLiked(!isLiked);
      // probably needs to be made into an optimistic update
    },
  });

  const handleLike = (e) => {
    e.preventDefault();
    mutate(tweet.id);
  };

  const toggleTweetForm = () => {
    setShowTweetForm(!showTweetForm);
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
