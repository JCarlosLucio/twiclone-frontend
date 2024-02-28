import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../../constants';
import { getTweetById } from '../../services/tweets';

export const useTweetById = (id) => {
  const { data: tweet, isLoading } = useQuery({
    queryKey: [queryKeys.tweets, id],
    queryFn: () => getTweetById(id),
  });
  return { tweet, isLoading };
};
