import { useMutation, useQueryClient } from 'react-query';
import { queryKeys } from '../../constants';
import { createTweet } from '../../services/tweets';

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  const { mutate: create, isLoading } = useMutation(createTweet, {
    onSuccess: (data) => {
      const tweets = queryClient.getQueryData(queryKeys.tweets);
      if (tweets) {
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
      }

      // For adding a reply to a replies query
      if (data.parent) {
        const replies = queryClient.getQueryData([
          queryKeys.tweets,
          data.parent,
          queryKeys.replies,
        ]);

        if (replies) {
          const updatedReplies = {
            ...replies,
            pages: replies.pages.map((page) => {
              return {
                ...page,
                tweets: [data, ...page.tweets],
              };
            }),
          };

          queryClient.setQueryData(
            [queryKeys.tweets, data.parent, queryKeys.replies],
            updatedReplies
          );
        }
      }
    },
  });

  return { create, isLoading };
};
