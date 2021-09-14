import { useQuery } from 'react-query';
import { Tweet } from './Tweet';
import { getAllTweets } from '../services/tweets';

export const TweetList = () => {
  const { data, error, isLoading, isError } = useQuery('tweets', getAllTweets);

  if (isLoading) return <p>Loading ...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};
