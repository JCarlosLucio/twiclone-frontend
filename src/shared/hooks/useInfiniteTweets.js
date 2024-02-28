import { useInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '../../constants';
import { getTweets } from '../../services/tweets';

export const useInfiniteTweets = (id) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery({
      queryKey: id
        ? [queryKeys.tweets, id, queryKeys.replies]
        : [queryKeys.tweets],
      queryFn: ({ pageParam = 1 }) => getTweets(pageParam, 10, id),
      getNextPageParam: (page) =>
        page.currentPage >= page.lastPage ? undefined : page.currentPage + 1,
    });
  return { data, fetchNextPage, hasNextPage, isLoading, isError, error };
};
