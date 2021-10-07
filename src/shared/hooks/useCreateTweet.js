import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../../constants';
import { createTweet } from '../../services/tweets';

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: create, isLoading } = useMutation(createTweet, {
    onSuccess: (data) => {
      const tweets = queryClient.getQueryData(queryKeys.tweets);
      const updatedTweets = {
        ...tweets,
        pages: tweets.pages.map((page) => {
          return {
            ...page,
            tweets: [data, ...page.tweets],
          };
        }),
      };

      queryClient.setQueryData(queryKeys.tweets, updatedTweets);
    },
  });

  return { create, isLoading };
};
