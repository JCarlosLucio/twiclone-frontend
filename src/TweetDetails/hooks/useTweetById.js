import { useQuery } from 'react-query';

import { queryKeys } from '../../constants';
import { getTweetById } from '../../services/tweets';

export const useTweetById = (id) => {
  const { data: tweet, isLoading } = useQuery([queryKeys.tweets, id], () =>
    getTweetById(id),
  );
  return { tweet, isLoading };
};
