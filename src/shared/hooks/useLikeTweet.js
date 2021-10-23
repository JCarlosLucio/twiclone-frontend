import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useMe } from '../hooks/useMe';
import { queryKeys } from '../../constants';
import { likeTweet } from '../../services/tweets';

export const useLikeTweet = (tweetId, likes) => {
  const { me } = useMe();
  const [isLiked, setIsLiked] = useState(likes?.includes(me.id));
  const [likesCount, setLikesCount] = useState(likes?.length);

  const queryClient = useQueryClient();

  const { mutate: like, isLoading: isLiking } = useMutation(
    () => likeTweet(tweetId),
    {
      onSuccess: (data) => {
        const tweets = queryClient.getQueryData(queryKeys.tweets);
        const updatedTweets = {
          ...tweets,
          pages: tweets.pages.map((page) => {
            return {
              ...page,
              tweets: page.tweets.map((t) => (t.id === tweetId ? data : t)),
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

        // TODO: probably needs to be made into an optimistic update
      },
    }
  );

  return { like, isLiked, likesCount, isLiking };
};
