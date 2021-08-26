import { TweetForm } from './TweetForm';
import { TweetList } from '../shared';

export const Feed = () => {
  return (
    <div>
      <TweetForm />
      <TweetList />
    </div>
  );
};
