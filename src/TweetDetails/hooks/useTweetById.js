import { useQuery } from 'react-query';
import { getTweetById } from '../../services/tweets';
import { queryKeys } from '../../constants';

export const useTweetById = (id) => {
  const { data: tweet, isLoading } = useQuery([queryKeys.tweets, id], () =>
    getTweetById(id),
  );
  return { tweet, isLoading };
};
