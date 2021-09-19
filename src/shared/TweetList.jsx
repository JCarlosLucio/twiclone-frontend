import { useInfiniteQuery } from 'react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Tweet } from './Tweet';
import { getTweets } from '../services/tweets';

export const TweetList = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } =
    useInfiniteQuery('tweets', ({ pageParam = 1 }) => getTweets(pageParam), {
      getNextPageParam: (page) =>
        page.currentPage >= page.lastPage ? undefined : page.currentPage + 1,
    });

  if (isLoading) return <p>Loading ...</p>;

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <InfiniteScroll
      dataLength={data.pages.length} //This is important field to render the next data
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {data.pages.map((pageData) => {
        return pageData.tweets.map((tweet) => {
          return <Tweet key={tweet.id} tweet={tweet} />;
        });
      })}
    </InfiniteScroll>
  );
};
