import { useInfiniteQuery } from 'react-query';
import { queryKeys } from '../../constants';
import { getTweets } from '../../services/tweets';

export const useInfiniteTweets = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery(
      queryKeys.tweets,
      ({ pageParam = 1 }) => getTweets(pageParam, 10),
      {
        getNextPageParam: (page) =>
          page.currentPage >= page.lastPage ? undefined : page.currentPage + 1,
      }
    );
  return { data, fetchNextPage, hasNextPage, isLoading, isError, error };
};
