import { useMutation, useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '../../constants';
import { createTweet } from '../../services/tweets';

export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  const { mutate: create, isLoading } = useMutation(createTweet, {
    onSuccess: (data) => {
      const tweets = queryClient.getQueryData([queryKeys.tweets]);
      if (tweets) {
        const updatedTweets = {
          ...tweets,
          pages: tweets.pages
            // updates replies count in parent tweet if tweet is reply
            .map((page) => {
              if (data.parent) {
                return {
                  ...page,
                  tweets: page.tweets.map((t) =>
                    t.id === data.parent
                      ? { ...t, replies: [...t.replies, t.id] }
                      : t,
                  ),
                };
              }
              return page;
            })
            // adds tweet/reply to only the first page of tweets
            .map((page, i) =>
              i === 0 ? { ...page, tweets: [data, ...page.tweets] } : page,
            ),
        };

        queryClient.setQueryData([queryKeys.tweets], updatedTweets);
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
            // adds reply to only the first page of replies
            pages: replies.pages.map((page, i) =>
              i === 0 ? { ...page, tweets: [data, ...page.tweets] } : page,
            ),
          };

          queryClient.setQueryData(
            [queryKeys.tweets, data.parent, queryKeys.replies],
            updatedReplies,
          );
        }
      }
    },
  });

  return { create, isLoading };
};
