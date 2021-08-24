import { useQuery } from 'react-query';
import { getAllTweets } from '../services/tweets';

export const TweetList = () => {
  const { data, error, isLoading, isError } = useQuery('tweets', getAllTweets);

  if (isLoading) return <p>Loading ...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((tweet) => (
        <li key={tweet.id}>{tweet.content}</li>
      ))}
    </ul>
  );
};
